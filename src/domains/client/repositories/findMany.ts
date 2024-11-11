import { DatabaseError } from '../../../errors'
import type { FindManyClientsParams, ClientToBeReturned } from '../clientInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyClientsParams): Promise<ClientToBeReturned[]> {
  try {
    const clients = await prismaClient.client.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cnpj: true,
        corporateName: true,
        fantasyName: true,
        segment: true,
        address: true,
        state: true,
        city: true,
        managerName: true,
        managerPhoneNumber: true,
        managerEmail: true,
        financePhoneNumber: true,
        lumpSum: true,
        unitValue: true,
        totalSavings: true,
        contractUrl: true,
        statusId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return clients
  } catch (error) {
    throw new DatabaseError(error)
  }
}
