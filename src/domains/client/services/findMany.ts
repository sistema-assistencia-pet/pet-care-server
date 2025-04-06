import type { Prisma } from '@prisma/client'

import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeReturnedInFindMany, FindManyClientsQueryParams } from '../clientInterfaces'
import { NotFoundError } from '../../../errors'
import type { FindManyResponse } from '../../../interfaces'
import { MASTER_CLIENT_CNPJ } from '../../../apiConfig'

export async function findMany (
  { skip, take, ...queryParams }: FindManyClientsQueryParams
): Promise<FindManyResponse<ClientToBeReturnedInFindMany>> {
  const CLIENTS_NOT_FOUND = 'Nenhum cliente encontrado.'

  const where: Prisma.ClientWhereInput = {
    cnpj: { not: MASTER_CLIENT_CNPJ },
    OR: []
  }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ cnpj: { contains: value as string } })
          where.OR?.push({ fantasyName: { contains: value as string } })
          where.OR?.push({ segment: { contains: value as string } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (where.OR?.length === 0) delete where.OR

  const clients = await clientRepositories.findMany({ skip, take, where })

  if (clients.length === 0) throw new NotFoundError(CLIENTS_NOT_FOUND)

  const totalCount = await clientRepositories.count(where)

  return { items: clients, totalCount }
}
