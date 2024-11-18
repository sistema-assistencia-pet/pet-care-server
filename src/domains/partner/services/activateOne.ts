import { status } from '../../../enums/status'
import { partnerRepositories } from '../repositories/partnerRepositories'

export async function activateOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: status.ACTIVE })
}
