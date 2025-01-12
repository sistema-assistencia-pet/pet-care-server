import type { Prisma, State } from '@prisma/client'

import { cityRepositories } from '../repositories/cityRepositories'
import type { FindManyCitiesQueryParams } from '../cityInterfaces'
import type { FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'

export async function findMany ({ skip, take, ...queryParams }: FindManyCitiesQueryParams): Promise<FindManyResponse<State>> {
  const CITIES_LIST_NOT_FOUND = 'Nenhuma cidade encontrada.'

  const where: Prisma.CityWhereInput = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          Object.assign(where, { name: { contains: value as string } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (where.OR?.length === 0) delete where.OR

  const cities = await cityRepositories.findMany({ skip, take, where })

  if (cities.length === 0) throw new NotFoundError(CITIES_LIST_NOT_FOUND)

  const totalCount = await cityRepositories.count(where)

  return { items: cities, totalCount }
}
