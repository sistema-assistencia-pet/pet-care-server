import type { Prisma, Client, User } from '@prisma/client'

import type { AddressToBeCreated, AddressToBeReturned } from '../address/addressInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'

export type ClientToBeCreated = Omit<Client, 'id' | 'availableBalance' | 'addressId' | 'cityId' | 'stateId' | 'statusId' | 'createdAt' | 'updatedAt'> & { address: AddressToBeCreated | null } & { managerCpf: User['cpf'], managerPassword: User['password'] }

export type ClientToBeReturned = Omit<Client, 'stateId' | 'cityId' | 'addressId' | 'statusId'> & { address: AddressToBeReturned | null } & { status: StatusToBeReturned }

export type ClientMinData = Pick<Client, 'id' | 'fantasyName'>

export type ClientToBeUpdated = Omit<Partial<ClientToBeCreated>, 'managerCpf' | 'managerPassword'>

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
