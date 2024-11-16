import { type Prisma } from '@prisma/client'

import type { FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type {
  FindManyPartnersQueryParams,
  PartnerToBeReturnedInFindMany
} from '../partnerInterfaces'

export async function findMany (
  { skip, take, ...queryParams }: FindManyPartnersQueryParams
): Promise<FindManyResponse<PartnerToBeReturnedInFindMany>> {
  const PARTNERS_NOT_FOUND = 'Nenhum estabelecimento encontrado.'

  const where: Prisma.PartnerWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ cnpj: { contains: value as string } })
          where.OR?.push({ fantasyName: { contains: value as string } })
          where.OR?.push({ tags: { contains: value as string } })
          where.OR?.push({ city: { name: { contains: value as string } } })
          where.OR?.push({ state: { name: { contains: value as string } } })
          where.OR?.push({ category: { name: { contains: value as string } } })
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
