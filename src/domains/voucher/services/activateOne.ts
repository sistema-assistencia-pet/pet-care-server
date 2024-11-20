import { status } from '../../../enums/status'
import { voucherRepositories } from '../repositories/voucherRepositories'

export async function activateOne (id: string): Promise<void> {
  await voucherRepositories.updateOne(id, { statusId: status.ACTIVE })
}
