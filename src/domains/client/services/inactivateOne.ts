import { clientRepositories } from '../repositories/clientRepositories'
import { memberRepositories } from '../../member/repositories/memberRepositories'
import { status } from '../../../enums/status'

export async function inactivateOne (id: string): Promise<void> {
  await clientRepositories.updateOne(id, { statusId: status.INACTIVE })
  await memberRepositories.updateMany({ statusId: status.INACTIVE }, { clientId: id })
}
