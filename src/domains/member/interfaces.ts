import { Prisma, type Member } from '@prisma/client'

export interface FindManyMembersQueryParams {
  clientCnpj?: string
  cpf?: string
  take: number
  name?: string
  skip: number
  statusId?: number | typeof NaN
}

export type FindManyMembersWhere = Pick<Prisma.MemberWhereInput, 'cpf' | 'clientId' | 'name' | 'statusId'>

export type MemberToBeCreated = Omit<Member, 'id' | 'password' | 'createdPassword' | 'totalSavings' | 'roleId' | 'createdAt' | 'updatedAt'>

export type MemberToBeUpdated = Omit<MemberToBeCreated, 'cpf' | 'statusId'>

export type MemberToBeReturned = Omit<Member, 'password' | 'createdPassword' | 'updatedAt'>

export type MemberToBeReturnedOnFindMany = Omit<MemberToBeReturned, | 'clientId'> & { client: { cnpj: string, fantasyName: string } }
