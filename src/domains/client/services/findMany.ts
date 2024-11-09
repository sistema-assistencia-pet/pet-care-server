import type { Prisma } from '@prisma/client'

import clientRepositories from '../repositories'
import type { ClientToBeReturned, FindManyClientsQueryParams } from '../interfaces'
import { NotFoundError } from '../../../errors'
import type { FindManyResponse } from '../../../interfaces'

export async function findMany (
  { skip, take, ...queryParams }: FindManyClientsQueryParams
): Promise<FindManyResponse<ClientToBeReturned>> {
  const CLIENTS_NOT_FOUND = 'Nenhum cliente encontrado.'

  const where: Prisma.ClientWhereInput = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'cnpj':
          Object.assign(where, { cnpj: { contains: value } })
          break
        case 'fantasyName':
          Object.assign(where, { fantasyName: { contains: value } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  const clients = await clientRepositories.findMany({ skip, take, where })

  if (clients.length === 0) throw new NotFoundError(CLIENTS_NOT_FOUND)

  const totalCount = await clientRepositories.count(where)

  return { items: clients, totalCount }
}
