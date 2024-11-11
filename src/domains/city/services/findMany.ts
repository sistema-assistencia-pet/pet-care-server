import type { Prisma, State } from '@prisma/client'

import { cityRepositories } from '../repositories/cityRepositories'
import type { FindManyCitiesQueryParams } from '../cityInterfaces'
import type { FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'

export async function findMany (queryParams: FindManyCitiesQueryParams): Promise<FindManyResponse<State>> {
  const CITIES_LIST_NOT_FOUND = 'Nenhuma cidade encontrada.'

  const where: Prisma.CityWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ name: { contains: value as string } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (where.OR?.length === 0) delete where.OR

  logger.debug(where, 'where')

  const cities = await cityRepositories.findMany(where)

  if (cities.length === 0) throw new NotFoundError(CITIES_LIST_NOT_FOUND)

  return { items: cities, totalCount: cities.length }
}
