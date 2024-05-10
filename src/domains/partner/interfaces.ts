import { Prisma, type Partner } from '@prisma/client'

export type PartnerToBeCreated = Omit<Partner, 'id' | 'image' | 'logo' | 'statusId' | 'createdAt' | 'updatedAt'>

export type PartnerToBeReturned = Pick<Partner, 'id' | 'cnpj' | 'fantasyName' | 'categoryId' | 'isOnline' | 'statusId' | 'createdAt'>

export type PartnerToBeUpdated = Omit<PartnerToBeCreated, 'cnpj'>
export interface FindManyPartnersQueryParams {
  categoryId?: number | typeof NaN
  isOnline?: boolean
  searchInput?: string
  skip?: number
  statusId?: number | typeof NaN
  take?: number
}

export interface FindManyPartnersParams {
  skip?: number
  take?: number
  where: Partial<Prisma.PartnerWhereInput>
}
