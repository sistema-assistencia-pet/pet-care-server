import { DatabaseError } from '../../../errors'
import type { FindManyPartnersParams, PartnerToBeReturnedInFindMany } from '../partnerInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyPartnersParams): Promise<PartnerToBeReturnedInFindMany[]> {
  try {
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
        city: {
          select: { id: true, name: true }
        },
        state: {
          select: { id: true, name: true }
        },
        isOnline: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return partners
  } catch (error) {
    throw new DatabaseError(error)
  }
}
