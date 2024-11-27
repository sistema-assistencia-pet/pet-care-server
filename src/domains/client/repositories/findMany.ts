import { DatabaseError } from '../../../errors'
import type { ClientToBeReturnedInFindMany, FindManyClientsParams } from '../clientInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyClientsParams): Promise<ClientToBeReturnedInFindMany[]> {
  try {
    const clients = await prismaClient.client.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cnpj: true,
        fantasyName: true,
        segment: true,
        availableBalanceInCents: true,
        city: {
          select: { id: true, name: true }
        },
        state: {
          select: { id: true, name: true }
        },
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return clients
  } catch (error) {
    throw new DatabaseError(error)
  }
}
