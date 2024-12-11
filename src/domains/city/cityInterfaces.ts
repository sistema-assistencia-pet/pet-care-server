import type { City, Prisma } from '@prisma/client'

export type CityToBeReturned = Omit<City, 'createdAt' | 'updatedAt'>

export type CityToBeCreated = Pick<City, 'name' | 'stateId'>

export type CityToBeUpdated = Partial<City>

export interface FindManyCitiesQueryParams {
  searchInput?: string
  skip?: number
  stateId?: number
  take?: number
}

export interface FindManyCitiesParams {
  skip?: number
  take?: number
  where: Partial<Prisma.CityWhereInput>
}
