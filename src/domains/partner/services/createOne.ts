import type { Address, Partner } from '@prisma/client'
import { addressRepositories } from '../../address/repositories/addressRepositories'
import { BadRequestError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeCreated } from '../partnerInterfaces'

export async function createOne (partnerToBeCreated: PartnerToBeCreated): Promise<Partner['id']> {
  const PARTNER_ALREADY_EXISTS = 'Estabelecimento já cadastrado.'

  const partner = await partnerRepositories.findOne({ cnpj: partnerToBeCreated.cnpj }, false)

  if (partner !== null) throw new BadRequestError(PARTNER_ALREADY_EXISTS)

  let addressId: Address['id'] | null = null
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (partnerToBeCreated.address) {
    const address = await addressRepositories.createOne(partnerToBeCreated.address)
    addressId = address.id
  }

  const { id } = await partnerRepositories.createOne(partnerToBeCreated, addressId)

  return id
}
