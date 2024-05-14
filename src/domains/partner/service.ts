import partnerRepositories from './repositories'
import {
  PartnerToBeCreated,
  PartnerToBeReturned,
  FindManyPartnersQueryParams,
  PartnerToBeUpdated
} from './interfaces'
import { NotFoundError } from '../../errors'
import { FindManyResponse } from '../../interfaces'
import { type Prisma } from '@prisma/client'
import { FILE_FIELD_NAMES } from '../../enums/fileFieldNames'

const createOne = async (partnerToBeCreated: PartnerToBeCreated): Promise<string> => {
  const { id } = await partnerRepositories.createOne(partnerToBeCreated)

  return id
}

const findMany = async (
  { skip, take, ...queryParams }: FindManyPartnersQueryParams
): Promise<FindManyResponse<PartnerToBeReturned>> => {
  const PARTNERS_NOT_FOUND = 'Nenhum estabelecimento encontrado.'

  const where: Prisma.PartnerWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ cnpj: { contains: value as string } })
          where.OR?.push({ fantasyName: { contains: value as string } })
          where.OR?.push({ tags: { contains: value as string } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  const partners = await partnerRepositories.findMany({ skip, take, where })

  if (partners.length === 0) throw new NotFoundError(PARTNERS_NOT_FOUND)

  const totalCount = await partnerRepositories.count(where)

  return { items: partners, totalCount }
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

const updateOne = async (id: string, partnerToBeUpdated: Partial<PartnerToBeUpdated>): Promise<void> => {
  await partnerRepositories.updateOne(id, partnerToBeUpdated)
}

const updateFile = async (
  { id, fileName, fieldName }: { id: string, fileName: string, fieldName: FILE_FIELD_NAMES }
): Promise<void> => {
  await partnerRepositories.updateOne(id, { [fieldName]: fileName })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne,
  updateFile,
  updateOne
}
