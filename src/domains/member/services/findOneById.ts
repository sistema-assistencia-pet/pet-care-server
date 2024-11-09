import { NotFoundError } from '../../../errors'
import type { MemberToBeReturned } from '../interfaces'
import { memberRepositories } from '../repositories/memberRepositories'

export async function findOneById (id: string): Promise<MemberToBeReturned> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneById(id)

  if (member === null) throw new NotFoundError(MEMBER_NOT_FOUND)

  const { password, createdPassword, updatedAt, ...memberToBeReturned } = member

  return memberToBeReturned
}
