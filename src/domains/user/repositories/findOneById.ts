import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'
import { status } from '../../../enums/statusEnum'
import type { UserToBeReturned } from '../userInterfaces'

export async function findOneById (id: string): Promise<UserToBeReturned | null> {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id, statusId: status.ACTIVE },
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

    return user
  } catch (error) {
    throw new DatabaseError(error)
  }
}
