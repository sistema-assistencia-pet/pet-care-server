import type { Prisma } from '@prisma/client'

import type { ClientToBeReturned } from '../clientInterfaces'
import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findOne (
  uniqueProps: Prisma.ClientWhereUniqueInput,
  fullInfo: boolean,
  optionalFilter?: Prisma.ClientWhereInput
): Promise<ClientToBeReturned | null> {
  try {
    const where = { ...uniqueProps }

    if (optionalFilter !== undefined) Object.assign(where, optionalFilter)

    const client = await prismaClient.client.findUnique({
      where,
      select: {
        id: true,
        cnpj: true,
        corporateName: fullInfo,
        fantasyName: true,
        segment: fullInfo,
        managerName: fullInfo,
        managerPhoneNumber: fullInfo,
        managerEmail: fullInfo,
        financePhoneNumber: fullInfo,
        lumpSumInCents: fullInfo,
        unitValueInCents: fullInfo,
        contractUrl: fullInfo,
        availableBalanceInCents: fullInfo,
        address: {
          select: {
            id: true,
            cep: true,
            street: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: {
              select: {
                id: true,
                name: true
              }
            },
            state: true
          }
        },
        status: {
          select: {
            id: true,
            translation: true
          }
        },
        createdAt: true,
        updatedAt: fullInfo
      }
    })

    return client
  } catch (error) {
    throw new DatabaseError(error)
  }
}
