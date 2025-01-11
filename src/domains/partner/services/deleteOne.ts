import { status } from '../../../enums/status'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { partnerRepositories } from '../repositories/partnerRepositories'

export async function deleteOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: status.DELETED })
  await voucherRepositories.updateMany({ statusId: status.DELETED }, { partnerId: id })
}
