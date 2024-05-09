import partnerRepositories from './repositories'
import {
  ClientToBeUpdated,
  PartnerToBeCreated,
  PartnerToBeReturned,
  FindManyClientsQueryParams,
  FindManyClientsWhere
} from './interfaces'
import memberRepositories from '../member/repositories'
import { NotFoundError } from '../../errors'
import { type FindManyResponse } from '../../interfaces'

const createOne = async (partnerToBeCreated: PartnerToBeCreated): Promise<string> => {
  const { id } = await partnerRepositories.createOne(partnerToBeCreated)

  return id
}

const findMany = async ({ skip, take, ...queryParams }: FindManyClientsQueryParams): Promise<FindManyResponse<ClientToBeReturned> & { systemTotalSavings: number }> => {
  const CLIENTS_NOT_FOUND = 'Nenhum cliente encontrado.'

  const where: FindManyClientsWhere = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'cnpj':
          Object.assign(where, { cnpj: { contains: value } })
          break
        case 'fantasyName':
          Object.assign(where, { fantasyName: { contains: value } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  const clients = await clientRepositories.findMany(skip, take, where)

  if (clients.length === 0) throw new NotFoundError(CLIENTS_NOT_FOUND)

  const totalCount = await clientRepositories.count(where)
  const systemTotalSavings = await clientRepositories.sumSystemSavings()

  return { items: clients, totalCount, systemTotalSavings: systemTotalSavings ?? 0 }
}

const findOneById = async (id: string): Promise<PartnerToBeReturned> => {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  const partner = await partnerRepositories.findOneById(id)

  if (partner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  const { updatedAt, ...partnerToBeReturned } = partner

  return partnerToBeReturned
}

const activateOne = async (id: string): Promise<void> => {
  await partnerRepositories.updateOne(id, { statusId: 1 })
}

const inactivateOne = async (id: string): Promise<void> => {
  await partnerRepositories.updateOne(id, { statusId: 2 })
}

const deleteOne = async (id: string): Promise<void> => {
  await partnerRepositories.updateOne(id, { statusId: 3 })
}

const updateOne = async (id: string, clientToBeUpdated: Partial<ClientToBeUpdated>): Promise<void> => {
  await clientRepositories.updateOne(id, clientToBeUpdated)
}

export default {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne,
  updateOne
}
