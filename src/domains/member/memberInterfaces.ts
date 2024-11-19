import type { Prisma, Member, Address } from '@prisma/client'

import type { AddressToBeCreated } from '../address/addressInterfaces'
import type { ClientMinData } from '../client/clientInterfaces'

export interface FindManyMembersQueryParams {
  clientCnpj?: string
  cpf?: string
  take: number
  name?: string
  skip: number
  statusId?: number | typeof NaN
}

export type FindManyMembersWhere = Pick<Prisma.MemberWhereInput, 'cpf' | 'clientId' | 'name' | 'statusId'>

export type MemberToBeCreated = Pick<Member, 'name' | 'cpf' | 'email' | 'phoneNumber' | 'birthDate' | 'clientId'> & { address: AddressToBeCreated | null }

export type MemberToBeCreatedInBulk = Pick<Member, 'name' | 'cpf' | 'email' | 'phoneNumber' | 'birthDate' | 'clientId' | 'statusId'> & { addressId: Address['id'] | null }

export type MemberToBeUpdated = Omit<MemberToBeCreated, 'cpf' | 'statusId'>

export type MemberToBeReturned = Omit<Member, 'password' | 'createdPassword' | 'updatedAt'>

export type MemberWithClientData = Member & { client: ClientMinData | null }

export type MemberLoginInfo = Pick<MemberWithClientData, 'id' | 'name' | 'roleId' | 'client'>

export type MemberToBeReturnedOnFindMany = Omit<MemberToBeReturned, | 'clientId'> & { client: { cnpj: string, fantasyName: string } }
