import { status } from '../../../enums/statusEnum'
import { memberRepositories } from '../repositories/memberRepositories'

export async function activateOne (id: string): Promise<void> {
  await memberRepositories.updateOne(id, { statusId: status.ACTIVE })
}
