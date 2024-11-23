import type { VoucherCode } from '@prisma/client'
import prismaClient from '../../../database/connection'

import type { VoucherCodeToBeCreated } from '../voucherCodeInterfaces'

export async function createOneForBulkCreation (voucherCodeToBeCreated: VoucherCodeToBeCreated): Promise<Pick<VoucherCode, 'id'>> {
  const voucherCode = await prismaClient.voucherCode.create({
    data: voucherCodeToBeCreated,
    select: {
      id: true
    }
  })

  return voucherCode
}
