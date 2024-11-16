import { partnerRepositories } from '../repositories/partnerRepositories'

export async function activateOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: 1 })
}
