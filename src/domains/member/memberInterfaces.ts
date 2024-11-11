import { type Prisma, type Member } from '@prisma/client'
import type { ClientDataForLogin } from '../client/clientInterfaces'

export interface FindManyMembersQueryParams {
  clientCnpj?: string
  cpf?: string
  take: number
  name?: string
  skip: number
  statusId?: number | typeof NaN
}

export type FindManyMembersWhere = Pick<Prisma.MemberWhereInput, 'cpf' | 'clientId' | 'name' | 'statusId'>

export type MemberToBeCreated = Omit<Member, 'id' | 'password' | 'hasCreatedPassword' | 'roleId' | 'statusId' | 'createdAt' | 'updatedAt'>

export type MemberToBeUpdated = Omit<MemberToBeCreated, 'cpf' | 'statusId'>

export type MemberToBeReturned = Omit<Member, 'password' | 'createdPassword' | 'updatedAt'>

export type MemberWithClientData = Member & { client: ClientDataForLogin | null }

export type MemberLoginInfo = Pick<MemberWithClientData, 'id' | 'name' | 'roleId' | 'client'>

export type MemberToBeReturnedOnFindMany = Omit<MemberToBeReturned, | 'clientId'> & { client: { cnpj: string, fantasyName: string } }
