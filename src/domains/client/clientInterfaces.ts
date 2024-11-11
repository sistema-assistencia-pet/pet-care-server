import type { Prisma, Client } from '@prisma/client'

export type ClientToBeCreated = Omit<Client, 'id' | 'totalSavings' | 'createdAt' | 'updatedAt'>

export type ClientToBeReturned = Omit<Client, 'updatedAt'>

export type ClientDataForLogin = Pick<Client, 'id' | 'fantasyName'>

export type ClientToBeUpdated = Omit<ClientToBeCreated, 'cnpj' | 'statusId'>
export interface FindManyClientsQueryParams {
  cnpj?: string
  take?: number
  fantasyName?: string
  skip?: number
  statusId?: number | typeof NaN
}

export interface FindManyClientsParams {
  skip?: number
  take?: number
  where: Partial<Prisma.ClientWhereInput>
}
