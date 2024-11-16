import type { Prisma, Partner } from '@prisma/client'

import type { AddressToBeCreated, AddressToBeReturned } from '../address/addressInterfaces'
import type { CategoryToBeReturned } from '../category/categoryInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'

export type PartnerToBeCreated = Omit<Partner, 'id' | 'addressId' | 'cityId' | 'stateId' | 'image' | 'logo' | 'statusId' | 'createdAt' | 'updatedAt'> & { address: AddressToBeCreated }

export type PartnerToBeReturned = Omit<Partner, 'stateId' | 'cityId' | 'addressId' | 'categoryId' | 'statusId'> & { category: CategoryToBeReturned } & { address: AddressToBeReturned | null } & { status: StatusToBeReturned }

export type PartnerDetailsToBeReturned = Partner & { category: { id: number, name: string } }

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
