import { status } from '../../../enums/status'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { partnerRepositories } from '../repositories/partnerRepositories'

export async function inactivateOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: status.INACTIVE })
  await voucherRepositories.updateMany({ statusId: status.INACTIVE }, { partnerId: id })
}
