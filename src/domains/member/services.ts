import { BadRequestError } from '../../errors'
import { MemberToBeCreated } from './interfaces'
import clientRepositories from '../client/repositories'
import memberRepositories from './repositories'

const createOne = async (memberToBeCreated: MemberToBeCreated): Promise<string> => {
  const INVALID_CLIENT = 'Cliente inválido.'

  const client = await clientRepositories.findOneById(memberToBeCreated.clientId)
  
  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const member = await memberRepositories.createOne(memberToBeCreated)

  return member.id
}

export default { createOne }
