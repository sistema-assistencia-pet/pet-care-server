import type { VoucherCode } from '@prisma/client'
import { status } from '../../../enums/status'
import { voucherCodeRepositories } from '../repositories/voucherCodeRepositories'

export async function deleteOne (id: VoucherCode['id']): Promise<void> {
  await voucherCodeRepositories.updateOne(id, { statusId: status.DELETED })
}
