import type { VoucherCode } from '@prisma/client'

import type { VoucherCodeToBeCreated } from '../voucherCodeInterfaces'
import { voucherCodeRepositories } from '../repositories/voucherCodeRepositories'

export async function createOne (voucherCodeToBeCreated: VoucherCodeToBeCreated): Promise<VoucherCode['id']> {
  const id = await voucherCodeRepositories.createOne(voucherCodeToBeCreated)

  return id
}
