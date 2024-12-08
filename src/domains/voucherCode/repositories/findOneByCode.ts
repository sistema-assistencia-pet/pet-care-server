import type { Prisma, VoucherCode } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findOneByCode (where: Prisma.VoucherCodeWhereUniqueInput): Promise<VoucherCode | null> {
  try {
    return await prismaClient.voucherCode.findUnique({ where })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
