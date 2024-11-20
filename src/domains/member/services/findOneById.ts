import type { Member, Prisma } from '@prisma/client'

import type { AccessTokenData } from '../../../interfaces'
import { memberRepositories } from '../repositories/memberRepositories'
import type { MemberToBeReturnedWithoutPassword } from '../memberInterfaces'
import { NotFoundError } from '../../../errors'
import { role } from '../../../enums/role'

export async function findOneById (accessTokenData: AccessTokenData, id: Member['id']): Promise<MemberToBeReturnedWithoutPassword> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const shouldReturnFullData = accessTokenData.roleId === role.MASTER ||
    accessTokenData.roleId === role.CLIENT_ADMIN ||
    accessTokenData.roleId === role.MEMBER

  const where: Prisma.MemberWhereInput = {}

  // Se for usuário de cliente, filtra associados pelo clientId
  if (accessTokenData.roleId === role.CLIENT_ADMIN) Object.assign(where, { clientId: accessTokenData.clientId })

  const member = await memberRepositories.findOne({ id }, shouldReturnFullData, where)

  if (member === null) throw new NotFoundError(MEMBER_NOT_FOUND)

  const { password, hasCreatedPassword, ...memberToBeReturned } = member

  return memberToBeReturned
}
