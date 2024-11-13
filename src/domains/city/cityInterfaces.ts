import type { City } from '@prisma/client'

export type CityToBeReturned = Omit<City, 'createdAt' | 'updatedAt'>

export type CityToBeCreated = Pick<City, 'name' | 'stateId'>

export interface FindManyCitiesQueryParams {
  searchInput?: string
  stateId?: number
}
