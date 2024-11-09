import type { Prisma } from '@prisma/client'
import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'

export async function count (where: Prisma.MemberWhereInput): Promise<number> {
  try {
    const count = await prismaClient.member.count({ where })

    return count
  } catch (error) {
    throw new DatabaseError(error)
  }
}
