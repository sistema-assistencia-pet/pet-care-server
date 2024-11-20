import type { Voucher } from '@prisma/client'

import type { VoucherToBeCreated } from '../../voucher/voucherInterfaces'
import { voucherRepositories } from '../repositories/voucherRepositories'

export async function createOne (voucherToBeCreated: VoucherToBeCreated): Promise<Voucher['id']> {
  const id = await voucherRepositories.createOne(voucherToBeCreated)

  return id
}
