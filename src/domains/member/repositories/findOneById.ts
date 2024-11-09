import prismaClient from '../../../database/connection'
import type { Member } from '@prisma/client'

import { DatabaseError } from '../../../errors'

export async function findOneById (id: string, data?: Partial<Member>): Promise<Member | null> {
  try {
    const where = { id }

    if (data !== undefined) Object.assign(where, data)

    const member = await prismaClient.member.findUnique({
      where,
      include: {
        client: {
          select: {
            cnpj: true,
            fantasyName: true
          }
        }
      }
    })

    return member
  } catch (error) {
    throw new DatabaseError(error)
  }
}
