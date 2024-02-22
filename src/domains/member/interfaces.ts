import { Member } from '@prisma/client'

export interface FindManyMembersQueryParams {
  clientCnpj?: string
  cpf?: string
  take: number
  name?: string
  skip: number
  statusId?: number | typeof NaN
}

export type FindManyWhere = Pick<Member, 'cpf' | 'clientId' | 'name' | 'statusId'>

export type MemberToBeCreated = Omit<Member, 'id' | 'password' | 'createdPassword' | 'totalSavings' | 'createdAt' | 'updatedAt'>

export type MemberToBeReturned = Omit<Member, 'password' | 'createdPassword' | 'updatedAt'>
