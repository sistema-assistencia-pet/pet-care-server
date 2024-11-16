import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import type { PartnerToBeReturned } from '../partnerInterfaces'
import prismaClient from '../../../database/connection'

export async function findOne (uniqueProps: Prisma.PartnerWhereUniqueInput, filter?: Prisma.PartnerWhereInput): Promise<PartnerToBeReturned | null> {
  try {
    const where = { ...uniqueProps }

    if (filter !== undefined) Object.assign(where, filter)

    const partner = await prismaClient.partner.findUnique({
      where,
      select: {
        id: true,
        cnpj: true,
        corporateName: true,
        fantasyName: true,
        tags: true,
        isOnline: true,
        managerName: true,
        managerPhoneNumber: true,
        managerEmail: true,
        businessPhoneNumber: true,
        about: true,
        openingHours: true,
        image: true,
        logo: true,
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
        createdAt: true,
        updatedAt: true
      }
    })

    return partner
  } catch (error) {
    throw new DatabaseError(error)
  }
}
