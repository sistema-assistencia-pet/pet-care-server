import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'
import { status } from '../../../enums/statusEnum'
import type { UserWithClientData } from '../userInterfaces'

export async function findOneByCpf (cpf: string): Promise<UserWithClientData | null> {
  try {
    const user = await prismaClient.user.findUnique({
      where: { cpf, statusId: status.ACTIVE },
      include: {
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
