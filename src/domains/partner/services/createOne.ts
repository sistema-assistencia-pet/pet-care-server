import { addressRepositories } from '../../address/repositories/addressRepositories'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeCreated } from '../partnerInterfaces'
import { BadRequestError } from '../../../errors'

export async function createOne (partnerToBeCreated: PartnerToBeCreated): Promise<string> {
  const PARTNER_ALREADY_EXISTS = 'Estabelecimento já cadastrado.'

  const partner = await partnerRepositories.findOne({ cnpj: partnerToBeCreated.cnpj })

  if (partner !== null) throw new BadRequestError(PARTNER_ALREADY_EXISTS)

  const { id: addressId } = await addressRepositories.createOne(partnerToBeCreated.address)

  const { id } = await partnerRepositories.createOne(partnerToBeCreated, addressId)

  return id
}
