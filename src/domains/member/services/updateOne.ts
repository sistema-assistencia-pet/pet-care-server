import type { MemberToBeUpdated } from '../interfaces'
import { memberRepositories } from '../repositories/memberRepositories'

export async function updateOne (id: string, memberToBeUpdated: Partial<MemberToBeUpdated>): Promise<void> {
  await memberRepositories.updateOne(id, memberToBeUpdated)
}
