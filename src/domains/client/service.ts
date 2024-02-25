import clientRepositories from './repositories'
import { ClientToBeCreated, ClientToBeReturned, FindManyClientsQueryParams, FindManyClientsWhere } from './interfaces'
import memberRepositories from '../member/repositories'
import { NotFoundError } from '../../errors'
import { FindManyResponse } from '../../interfaces'

const createOne = async (clientToBeCreated: ClientToBeCreated): Promise<string> => {
  const { id } = await clientRepositories.createOne(clientToBeCreated)

  return id
}

const findMany = async ({ skip, take, ...queryParams }: FindManyClientsQueryParams): Promise<FindManyResponse<ClientToBeReturned>> => {
  const CLIENTS_NOT_FOUND = 'Nenhum cliente encontrado.'

  const where: Partial<FindManyClientsWhere> = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    if (
      value !== undefined
        && !Number.isNaN(value)
    ) Object.assign(where, { [key]: value })
  })

  const clients = await clientRepositories.findMany(skip, take, where)
  
  if (clients.length === 0) throw new NotFoundError(CLIENTS_NOT_FOUND)

  const totalCount = await clientRepositories.count({ statusId: queryParams.statusId })

  return { items: clients, totalCount }
}

const findOneById = async (id: string): Promise<ClientToBeReturned> => {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  const client = await clientRepositories.findOneById(id)
  
  if (client === null) throw new NotFoundError(CLIENT_NOT_FOUND)

  const { updatedAt, ...clientToBeReturned } = client

  return clientToBeReturned
}

const activateOne = async (id: string): Promise<void> => {
  await clientRepositories.updateOne(id, { statusId: 1 })
  await memberRepositories.updateMany({ statusId: 1 }, { clientId: id })
}

const inactivateOne = async (id: string): Promise<void> => {
  await clientRepositories.updateOne(id, { statusId: 2 })
  await memberRepositories.updateMany({ statusId: 2 }, { clientId: id })
}

const deleteOne = async (id: string): Promise<void> => {
  await clientRepositories.updateOne(id, { statusId: 3 })
  await memberRepositories.updateMany({ statusId: 3 }, { clientId: id })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne
}
