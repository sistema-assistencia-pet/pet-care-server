import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import type { VoucherRedemptionToBeReturned } from '../voucherRedemptionInterfaces'

export async function findFirst (
  where: Pick<Prisma.VoucherRedemptionWhereInput, 'member' | 'voucherCode'>
): Promise<VoucherRedemptionToBeReturned | null> {
  try {
    return await prismaClient.voucherRedemption.findFirst({
      where,
      include: {
        voucherCode: true
      }
    })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
