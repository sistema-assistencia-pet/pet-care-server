import type { Prisma, VoucherCode } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findMany (where: Prisma.VoucherCodeWhereInput): Promise<VoucherCode[]> {
  try {
    const voucherCodes = await prismaClient.voucherCode.findMany({ where })

    return voucherCodes
  } catch (error) {
    throw new DatabaseError(error)
  }
}
