import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'
import type { Prisma } from '@prisma/client'
import type { UserToBeReturned } from '../userInterfaces'

export async function findOneById (where: Partial<Prisma.UserWhereInput>): Promise<UserToBeReturned | null> {
  try {
    const [user] = await prismaClient.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        status: {
          select: {
            id: true,
            translation: true
          }
        },
        role: {
          select: {
            id: true,
            translation: true
          }
        },
        client: {
          select: {
            id: true,
            fantasyName: true
          }
        }
      }
    })

    return user ?? null
  } catch (error) {
    throw new DatabaseError(error)
  }
}
