import { DatabaseError } from '../../../errors'
import type { FindManyUsersParams, UserToBeReturnedInFindMany } from '../userInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyUsersParams): Promise<UserToBeReturnedInFindMany[]> {
  try {
    const users = await prismaClient.user.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cpf: true,
        name: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            fantasyName: true
          }
        },
        role: {
          select: {
            id: true,
            translation: true
          }
        },
        status: {
          select: {
            id: true,
            translation: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return users
  } catch (error) {
    throw new DatabaseError(error)
  }
}
