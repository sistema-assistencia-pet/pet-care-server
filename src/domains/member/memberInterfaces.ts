import type { Prisma, Member, Address } from '@prisma/client'

import type { AddressToBeCreated, AddressToBeReturned } from '../address/addressInterfaces'
import type { ClientMinData } from '../client/clientInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'

export interface FindManyMembersQueryParams {
  searchInput?: string
  take?: number
  skip?: number
  statusId?: number | typeof NaN
}

export interface FindManyMembersParams {
  skip?: number
  take?: number
  where: Partial<Prisma.MemberWhereInput>
}

export type FindManyMembersWhere = Pick<Prisma.MemberWhereInput, 'cpf' | 'clientId' | 'name' | 'statusId'>

export type MemberToBeCreated = Pick<Member, 'name' | 'cpf' | 'email' | 'phoneNumber' | 'birthDate' | 'clientId'> & { address: AddressToBeCreated | null }

export type MemberToBeCreatedInBulk = Pick<Member, 'name' | 'cpf' | 'email' | 'phoneNumber' | 'birthDate' | 'clientId' | 'statusId'> & { addressId: Address['id'] | null }

export type MemberToBeUpdated = Partial<MemberToBeCreated>

export type MemberToBeReturned = Omit<Member, 'addressId' | 'statusId' | 'roleId' | 'clientId'> & { address: AddressToBeReturned | null } & { status: StatusToBeReturned } & { client: ClientMinData }

export type MemberToBeReturnedWithoutPassword = Omit<MemberToBeReturned, 'password' | 'hasCreatedPassword'>

export type MemberWithClientData = Member & { client: ClientMinData | null }

export type MemberLoginInfo = Pick<MemberWithClientData, 'id' | 'name' | 'roleId' | 'client'>

export type MemberToBeReturnedOnFindMany = Pick<MemberToBeReturnedWithoutPassword, 'id' | 'name' | 'cpf' | 'createdAt' | 'client' | 'status'>
