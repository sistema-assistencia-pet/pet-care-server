/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Client } from '@prisma/client'

import { addressRepositories } from '../../address/repositories/addressRepositories'
import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeUpdated } from '../clientInterfaces'
import { NotFoundError } from '../../../errors'

export async function updateOne (
  clientId: Client['id'],
  clientToBeUpdated: Partial<ClientToBeUpdated>
): Promise<Client['id']> {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  const currentClient = await clientRepositories.findOne({ id: clientId }, false)

  if (currentClient === null) throw new NotFoundError(CLIENT_NOT_FOUND)

  const { address: currentAddress } = currentClient
  const { address: newAddress, ...updatedClientWithoutAddress } = clientToBeUpdated

  if (currentAddress) { // endereço antigo é diferente de null
    if (newAddress) { // novo endereço é diferente de null - atualizar endereço antigo
      await addressRepositories.updateOne(currentAddress.id, newAddress)
      await clientRepositories.updateOne(
        currentClient.id,
        { cityId: newAddress.cityId, stateId: newAddress.stateId }
      )
    } else { // novo endereço é null - excluir endereço antigo
      await clientRepositories.updateOne(currentClient.id, { addressId: null })
      await addressRepositories.deleteOne(currentAddress.id)
    }
  } else if (newAddress) { // endereço antigo é null e novo endereço é diferente de null - criar novo endereço
    const { id: addressId } = await addressRepositories.createOne(newAddress)
    await clientRepositories.updateOne(
      currentClient.id,
      { addressId, cityId: newAddress.cityId, stateId: newAddress.stateId }
    )
  }

  const id = await clientRepositories.updateOne(clientId, updatedClientWithoutAddress)

  return id
}
