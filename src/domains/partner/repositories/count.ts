import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function count (where: Prisma.PartnerWhereInput): Promise<number> {
  try {
    const count = await prismaClient.partner.count({ where })

    return count
  } catch (error) {
    throw new DatabaseError(error)
  }
}
