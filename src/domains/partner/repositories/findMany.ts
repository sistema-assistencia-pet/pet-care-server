import { DatabaseError } from '../../../errors'
import type { FindManyPartnersParams, PartnerToBeReturned } from '../partnerInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyPartnersParams): Promise<PartnerToBeReturned[]> {
  try {
    logger.debug({ where }, 'where')

    const partners = await prismaClient.partner.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cnpj: true,
        fantasyName: true,
        category: {
          select: { id: true, name: true }
        },
        isOnline: true,
        statusId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return partners
  } catch (error) {
    throw new DatabaseError(error)
  }
}
