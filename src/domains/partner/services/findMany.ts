import partnerRepositories from '../repositories'
import type {
  PartnerToBeReturned,
  FindManyPartnersQueryParams
} from '../interfaces'
import { NotFoundError } from '../../../errors'
import type { FindManyResponse } from '../../../interfaces'
import { type Prisma } from '@prisma/client'

export async function findMany (
  { skip, take, ...queryParams }: FindManyPartnersQueryParams
): Promise<FindManyResponse<PartnerToBeReturned>> {
  const PARTNERS_NOT_FOUND = 'Nenhum estabelecimento encontrado.'

  const where: Prisma.PartnerWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    logger.debug({ queryParams }, 'queryParams')
    if (value !== undefined && value !== null) {
      logger.debug({ key, value }, 'key value')
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

  if (where.OR?.length === 0) delete where.OR

  const partners = await partnerRepositories.findMany({ skip, take, where })

  if (partners.length === 0) throw new NotFoundError(PARTNERS_NOT_FOUND)

  const totalCount = await partnerRepositories.count(where)

  return { items: partners, totalCount }
}
