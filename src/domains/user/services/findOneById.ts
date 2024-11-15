import type { AccessTokenData } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import type { Prisma } from '@prisma/client'
import { userRepositories } from '../repositories/userRepositories'
import type { UserToBeReturned } from '../userInterfaces'
import { role } from '../../../enums/roleEnum'
import { status } from '../../../enums/statusEnum'

export async function findOneById (accessTokenData: AccessTokenData, id: string): Promise<UserToBeReturned> {
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const where: Prisma.UserWhereInput = { OR: [] }

  where.OR?.push({ id })
  where.OR?.push({ statusId: status.ACTIVE })

  if (accessTokenData.roleId === role.CLIENT_ADMIN) where.OR?.push({ clientId: accessTokenData.clientId })

  const user = await userRepositories.findOneById(where)

  if (user === null) throw new NotFoundError(USER_NOT_FOUND)

  return user
}
