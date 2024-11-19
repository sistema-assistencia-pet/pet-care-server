import type { Address } from '@prisma/client'
import { BadRequestError } from '../../../errors'
import { addressRepositories } from '../../address/repositories/addressRepositories'
import { type MemberToBeCreated } from '../memberInterfaces'
import { memberRepositories } from '../repositories/memberRepositories'

export async function createOne (memberToBeCreated: MemberToBeCreated): Promise<string> {
  const MEMBER_ALREADY_EXISTS = 'Associado já cadastrado.'

  const member = await memberRepositories.findOneByCpf(memberToBeCreated.cpf)

  if (member !== null) throw new BadRequestError(MEMBER_ALREADY_EXISTS)

  let addressId: Address['id'] | null = null
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (memberToBeCreated.address) {
    const address = await addressRepositories.createOne(memberToBeCreated.address)
    addressId = address.id
  }
  const { id } = await memberRepositories.createOne(memberToBeCreated, addressId)

  return id
}
