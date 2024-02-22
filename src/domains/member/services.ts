import { BadRequestError, NotFoundError } from '../../errors'
import { FindManyResponse } from '../../interfaces'
import clientRepositories from '../client/repositories'
import { FindManyMembersQueryParams, FindManyWhere, MemberToBeCreated, MemberToBeReturned } from './interfaces'
import memberRepositories from './repositories'

const createOne = async (memberToBeCreated: MemberToBeCreated): Promise<string> => {
  const INVALID_CLIENT = 'Cliente inválido.'

  const client = await clientRepositories.findOneById(memberToBeCreated.clientId)
  
  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const member = await memberRepositories.createOne(memberToBeCreated)

  return member.id
}

const findMany = async ({ skip, take, ...queryParams }: FindManyMembersQueryParams): Promise<FindManyResponse<MemberToBeReturned>> => {
  const MEMBERS_NOT_FOUND = 'Associados não encontrados.'
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  const where: Partial<FindManyWhere> = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    if (
      value !== undefined
        && !Number.isNaN(value)
        && key !== 'clientCnpj'
    ) Object.assign(where, { [key]: value })
  })

  if (queryParams.clientCnpj !== undefined) {
    const client = await clientRepositories.findOneByCnpj(queryParams.clientCnpj)

    if (client === null) throw new BadRequestError(CLIENT_NOT_FOUND)

    Object.assign(where, { clientId: client.id })
  }

  const members = await memberRepositories.findMany(skip, take, where)
  
  if (members.length === 0) throw new NotFoundError(MEMBERS_NOT_FOUND)

  const totalCount = await memberRepositories.count({ statusId: queryParams.statusId })

  return { items: members, totalCount }
}

const findOneById = async (id: string): Promise<MemberToBeReturned> => {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneById(id)
  
  if (member === null) throw new NotFoundError(MEMBER_NOT_FOUND)

  const { password, createdPassword, updatedAt, ...memberToBeReturned } = member

  return memberToBeReturned
}

const activateOne = async (id: string): Promise<void> => {
  await memberRepositories.updateOne(id, { statusId: 1 })
}

const inactivateOne = async (id: string): Promise<void> => {
  await memberRepositories.updateOne(id, { statusId: 2 })
}

const deleteOne = async (id: string): Promise<void> => {
  await memberRepositories.updateOne(id, { statusId: 3 })
}

export default { 
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne
}
