import type { Prisma, Partner, State } from '@prisma/client'

import type { AddressToBeCreated, AddressToBeReturned } from '../address/addressInterfaces'
import type { CategoryToBeReturned } from '../category/categoryInterfaces'
import type { CityToBeReturned } from '../city/cityInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'

export type PartnerToBeCreated = Omit<Partner, 'id' | 'roleId' | 'addressId' | 'cityId' | 'stateId' | 'image' | 'logo' | 'statusId' | 'createdAt' | 'updatedAt'> & { address: AddressToBeCreated | null }

export type PartnerToBeReturned = Omit<Partner, 'stateId' | 'cityId' | 'addressId' | 'categoryId' | 'statusId'> & { category: CategoryToBeReturned } & { address: AddressToBeReturned | null } & { status: StatusToBeReturned }

export type PartnerToBeReturnedWithoutPassword = Omit<PartnerToBeReturned, 'password'>

export type PartnerToBeReturnedInFindMany = Pick<PartnerToBeReturnedWithoutPassword, 'id' | 'cnpj' | 'fantasyName' | 'category' | 'isOnline' | 'createdAt'> & { city: Omit<CityToBeReturned, 'stateId'> | null } & { state: State | null }

export type PartnerToBeUpdated = Partial<PartnerToBeCreated>
export interface FindManyPartnersQueryParams {
  categoryId?: number | typeof NaN
  cityId?: number | typeof NaN
  isOnline?: boolean
  searchInput?: string
  skip?: number
  stateId?: number | typeof NaN
  statusId?: number | typeof NaN
  take?: number
}

export interface PartnerLoginInfo {
  id: Partner['id']
  name: Partner['fantasyName']
  roleId: Partner['roleId']
  client: null
}

export interface FindManyPartnersParams {
  skip?: number
  take?: number
  where: Partial<Prisma.PartnerWhereInput>
}
