import { type Client } from '@prisma/client'

export type ClientToBeCreated = Omit<Client, 'id' | 'totalSavings' | 'createdAt' | 'updatedAt'>

export type ClientToBeReturned = Omit<Client, 'updatedAt'>

export interface FindManyClientsQueryParams {
  cnpj?: string
  take: number
  fantasyName?: string
  skip: number
  statusId?: number | typeof NaN
}

export type FindManyClientsWhere = Pick<Client, 'cnpj' | 'fantasyName' | 'statusId'>
