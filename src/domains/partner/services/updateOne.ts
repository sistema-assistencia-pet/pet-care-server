import type { Partner } from '@prisma/client'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeUpdated } from '../partnerInterfaces'

export async function updateOne (partnerId: string, partnerToBeUpdated: Partial<PartnerToBeUpdated>): Promise<Partner['id']> {
  const id = await partnerRepositories.updateOne(partnerId, partnerToBeUpdated)

  return id
}
