import type { Prisma, Client, User, State } from '@prisma/client'

import type { AddressToBeCreated, AddressToBeReturned } from '../address/addressInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'
import type { CityToBeReturned } from '../city/cityInterfaces'

export type ClientToBeCreated = Omit<Client, 'id' | 'availableBalanceInCents' | 'addressId' | 'cityId' | 'stateId' | 'statusId' | 'createdAt' | 'updatedAt'> & { address: AddressToBeCreated | null } & { managerCpf: User['cpf'], managerPassword: User['password'] }

export type ClientToBeReturned = Omit<Client, 'stateId' | 'cityId' | 'addressId' | 'statusId'> & { address: AddressToBeReturned | null } & { status: StatusToBeReturned }

export type ClientToBeReturnedInFindMany = Pick<Client, 'id' | 'cnpj' | 'fantasyName' | 'segment' | 'availableBalanceInCents' | 'createdAt'> & { city: Omit<CityToBeReturned, 'stateId'> | null, state: State | null }

export type ClientMinData = Pick<Client, 'id' | 'fantasyName'>

export type ClientToBeUpdated = Omit<Partial<ClientToBeCreated>, 'managerCpf' | 'managerPassword'>

export interface FindManyClientsQueryParams {
  searchInput?: string
  take?: number
  skip?: number
  statusId?: number | typeof NaN
}

export interface FindManyClientsParams {
  skip?: number
  take?: number
  where: Partial<Prisma.ClientWhereInput>
}
