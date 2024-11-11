import type { City } from '@prisma/client'

export type CityToBeReturned = Omit<City, 'createdAt' | 'updatedAt'>

export interface FindManyCitiesQueryParams {
  searchInput?: string
  stateId?: number
}
