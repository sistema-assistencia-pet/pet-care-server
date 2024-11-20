import type { Voucher } from '@prisma/client'

import type { VoucherToBeUpdated } from '../../voucher/voucherInterfaces'
import { voucherRepositories } from '../repositories/voucherRepositories'

export async function updateOne (
  voucherId: Voucher['id'],
  voucherToBeUpdated: VoucherToBeUpdated
): Promise<Voucher['id']> {
  const id = await voucherRepositories.updateOne(voucherId, voucherToBeUpdated)

  return id
}
