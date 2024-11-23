/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Partner } from '@prisma/client'

import { addressRepositories } from '../../address/repositories/addressRepositories'
import { NotFoundError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeUpdated } from '../partnerInterfaces'

export async function updateOne (
  partnerId: Partner['id'],
  partnerToBeUpdated: PartnerToBeUpdated
): Promise<Partner['id']> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  const currentPartner = await partnerRepositories.findOne({ id: partnerId }, false)

  if (currentPartner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  const { address: currentAddress } = currentPartner
  const { address: newAddress, ...updatedPartnerWithoutAddress } = partnerToBeUpdated

  if (currentAddress) { // endereço antigo é diferente de null
    if (newAddress) { // novo endereço é diferente de null - atualizar endereço antigo
      await addressRepositories.updateOne(currentAddress.id, newAddress)
      await partnerRepositories.updateOne(
        currentPartner.id,
        { cityId: newAddress.cityId, stateId: newAddress.stateId }
      )
    } else { // novo endereço é null - excluir endereço antigo
      await partnerRepositories.updateOne(currentPartner.id, { addressId: null })
      await addressRepositories.deleteOne(currentAddress.id)
    }
  } else if (newAddress) { // endereço antigo é null e novo endereço é diferente de null - criar novo endereço
    const { id: addressId } = await addressRepositories.createOne(newAddress)
    await partnerRepositories.updateOne(
      currentPartner.id,
      { addressId, cityId: newAddress.cityId, stateId: newAddress.stateId }
    )
  }

  const id = await partnerRepositories.updateOne(partnerId, updatedPartnerWithoutAddress)

  return id
}
