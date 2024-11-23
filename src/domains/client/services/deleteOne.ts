import { clientRepositories } from '../repositories/clientRepositories'
import { memberRepositories } from '../../member/repositories/memberRepositories'
import { status } from '../../../enums/status'

export async function deleteOne (id: string): Promise<void> {
  await clientRepositories.updateOne(id, { statusId: status.DELETED })
  await memberRepositories.updateMany({ statusId: status.DELETED }, { clientId: id })
}
