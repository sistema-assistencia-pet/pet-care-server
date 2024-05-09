import { Prisma, type Partner } from '@prisma/client'

export type PartnerToBeCreated = Omit<Partner, 'id' | 'image' | 'logo' | 'statusId' | 'createdAt' | 'updatedAt'>

export type PartnerToBeReturned = Omit<Partner, 'updatedAt'>

export type PartnerToBeUpdated = Omit<PartnerToBeCreated, 'cnpj' | 'statusId'>
export interface FindManyPartnersQueryParams {
  cnpj?: string
  take: number
  fantasyName?: string
  skip: number
  statusId?: number | typeof NaN
}

export type FindManyPartnersWhere = Pick<Prisma.PartnerWhereInput, 'cnpj' | 'fantasyName' | 'statusId'>
