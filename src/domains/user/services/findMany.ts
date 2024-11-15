import { type Prisma } from '@prisma/client'

import type { AccessTokenData, FindManyResponse } from '../../../interfaces'
import type { FindManyUsersQueryParams, UserToBeReturnedInFindMany } from '../userInterfaces'
import { NotFoundError } from '../../../errors'
import { userRepositories } from '../repositories/userRepositories'
import { role } from '../../../enums/roleEnum'

export async function findMany (
  accessTokenData: AccessTokenData,
  { skip, take, ...queryParams }: FindManyUsersQueryParams
): Promise<FindManyResponse<UserToBeReturnedInFindMany>> {
  const USERS_NOT_FOUND = 'Nenhum usuário encontrado.'

  const where: Prisma.UserWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ cpf: { contains: value as string } })
          where.OR?.push({ name: { contains: value as string } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (accessTokenData.roleId === role.CLIENT_ADMIN) where.OR?.push({ clientId: accessTokenData.clientId })

  if (where.OR?.length === 0) delete where.OR

  const users = await userRepositories.findMany({ skip, take, where })

  if (users.length === 0) throw new NotFoundError(USERS_NOT_FOUND)

  const totalCount = await userRepositories.count(where)

  return { items: users, totalCount }
}
