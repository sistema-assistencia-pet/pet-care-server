import { BadRequestError, NotFoundError } from '../../errors'
import clientRepositories from '../client/repositories'
import memberRepositories from './repositories'
import { MemberToBeCreated, MemberToBeReturned } from './interfaces'

const createOne = async (memberToBeCreated: MemberToBeCreated): Promise<string> => {
  const INVALID_CLIENT = 'Cliente inválido.'

  const client = await clientRepositories.findOneById(memberToBeCreated.clientId)
  
  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const member = await memberRepositories.createOne(memberToBeCreated)

  return member.id
}

const findOneById = async (id: string): Promise<MemberToBeReturned> => {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneById(id)
  
  if (member === null) throw new NotFoundError(MEMBER_NOT_FOUND)

  return member
}

export default { createOne, findOneById }
