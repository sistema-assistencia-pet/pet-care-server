import type { Prisma } from '@prisma/client'

import type { FindManyMembersQueryParams, MemberToBeReturnedOnFindMany } from '../memberInterfaces'
import type { AccessTokenData, FindManyResponse } from '../../../interfaces'
import { memberRepositories } from '../repositories/memberRepositories'
import { NotFoundError } from '../../../errors'
import { role } from '../../../enums/role'

export async function findMany (
  accessTokenData: AccessTokenData,
  { skip, take, ...queryParams }: FindManyMembersQueryParams
): Promise<FindManyResponse<MemberToBeReturnedOnFindMany>> {
  const MEMBERS_NOT_FOUND = 'Nenhum associado encontrado.'

  const where: Prisma.MemberWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ cpf: { contains: value as string } })
          where.OR?.push({ name: { contains: value as string } })
          where.OR?.push({ client: { cnpj: { contains: value as string } } })
          where.OR?.push({ client: { fantasyName: { contains: value as string } } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (accessTokenData.roleId === role.CLIENT_ADMIN) Object.assign(where, { clientId: accessTokenData.clientId })

  if (where.OR?.length === 0) delete where.OR

  const members = await memberRepositories.findMany({ skip, take, where })

  if (members.length === 0) throw new NotFoundError(MEMBERS_NOT_FOUND)

  const totalCount = await memberRepositories.count(where)

  return { items: members, totalCount }
}
