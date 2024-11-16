import { partnerRepositories } from '../repositories/partnerRepositories'

export async function deleteOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: 3 })
}
