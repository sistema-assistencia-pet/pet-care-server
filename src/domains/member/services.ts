import { BadRequestError, NotFoundError } from '../../errors'
import clientRepositories from '../client/repositories'
import { FindManyMembersQueryParams, MemberToBeCreated, MemberToBeReturned } from './interfaces'
import memberRepositories from './repositories'

const createOne = async (memberToBeCreated: MemberToBeCreated): Promise<string> => {
  const INVALID_CLIENT = 'Cliente inválido.'

  const client = await clientRepositories.findOneById(memberToBeCreated.clientId)
  
  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const member = await memberRepositories.createOne(memberToBeCreated)

  return member.id
}

const findMany = async (queryParams: FindManyMembersQueryParams): Promise<MemberToBeReturned[]> => {
  const MEMBERS_NOT_FOUND = 'Associados não encontrados.'

  const members = await memberRepositories.findMany(queryParams)
  
  if (members.length === 0) throw new NotFoundError(MEMBERS_NOT_FOUND)

  return members
}

const findOneById = async (id: string): Promise<MemberToBeReturned> => {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneById(id)
  
  if (member === null) throw new NotFoundError(MEMBER_NOT_FOUND)

  const { password, createdPassword, updatedAt, ...memberToBeReturned } = member

  return memberToBeReturned
}

export default { createOne, findMany, findOneById }
