import { status } from '../../../enums/status'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { partnerRepositories } from '../repositories/partnerRepositories'

export async function activateOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: status.ACTIVE })
  await voucherRepositories.updateMany({ statusId: status.ACTIVE }, { partnerId: id })
}
