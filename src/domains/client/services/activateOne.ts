import { clientRepositories } from '../repositories/clientRepositories'
import { memberRepositories } from '../../member/repositories/memberRepositories'
import { status } from '../../../enums/status'

export async function activateOne (id: string): Promise<void> {
  await clientRepositories.updateOne(id, { statusId: status.ACTIVE })
  await memberRepositories.updateMany({ statusId: status.ACTIVE }, { clientId: id })
}
