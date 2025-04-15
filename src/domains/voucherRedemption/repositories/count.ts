import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function count (
  where: Prisma.VoucherRedemptionWhereInput
): Promise<number> {
  try {
    return await prismaClient.voucherRedemption.count({ where })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
