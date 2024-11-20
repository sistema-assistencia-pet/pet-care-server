import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import type { PartnerToBeReturned } from '../partnerInterfaces'
import prismaClient from '../../../database/connection'

export async function findOne (
  uniqueProps: Prisma.PartnerWhereUniqueInput,
  fullInfo: boolean,
  optionalFilter?: Prisma.PartnerWhereInput
): Promise<PartnerToBeReturned | null> {
  try {
    const where = { ...uniqueProps }

    if (optionalFilter !== undefined) Object.assign(where, optionalFilter)

    const partner = await prismaClient.partner.findUnique({
      where,
      select: {
        id: true,
        cnpj: true,
        corporateName: fullInfo,
        fantasyName: true,
        tags: true,
        isOnline: true,
        managerName: fullInfo,
        managerPhoneNumber: fullInfo,
        managerEmail: fullInfo,
        businessPhoneNumber: fullInfo,
        about: true,
        openingHours: true,
        image: true,
        logo: true,
        roleId: true,
        password: fullInfo,
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
        category: {
          select: {
            id: true,
            name: true
          }
        },
        createdAt: fullInfo,
        updatedAt: fullInfo
      }
    })

    return partner
  } catch (error) {
    throw new DatabaseError(error)
  }
}
