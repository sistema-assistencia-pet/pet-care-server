import prismaClient from '../../../database/connection'
import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import type { MemberToBeReturned } from '../memberInterfaces'

export async function findOne (uniqueProps: Prisma.MemberWhereUniqueInput, fullInfo: boolean, optionalFilter?: Prisma.MemberWhereInput): Promise<MemberToBeReturned | null> {
  try {
    const where = { ...uniqueProps }

    if (optionalFilter !== undefined) Object.assign(where, optionalFilter)

    const member = await prismaClient.member.findUnique({
      where,
      select: {
        id: true,
        cpf: true,
        name: true,
        email: true,
        phoneNumber: true,
        birthDate: true,
        hasCreatedPassword: fullInfo,
        password: fullInfo,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        status: {
          select: {
            id: true,
            translation: true
          }
        },
        client: {
          select: {
            id: true,
            cnpj: true,
            fantasyName: true
          }
        },
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
            state: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        createdAt: fullInfo,
        updatedAt: fullInfo
      }
    })

    return member
  } catch (error) {
    throw new DatabaseError(error)
  }
}
