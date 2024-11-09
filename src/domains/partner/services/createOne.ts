import partnerRepositories from '../repositories'
import type { PartnerToBeCreated } from '../interfaces'

export async function createOne (partnerToBeCreated: PartnerToBeCreated): Promise<string> {
  const { id } = await partnerRepositories.createOne(partnerToBeCreated)

  return id
}
