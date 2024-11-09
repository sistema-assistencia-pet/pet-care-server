import partnerRepositories from '../repositories'
import type { PartnerToBeUpdated } from '../interfaces'

export async function updateOne (id: string, partnerToBeUpdated: Partial<PartnerToBeUpdated>): Promise<void> {
  await partnerRepositories.updateOne(id, partnerToBeUpdated)
}
