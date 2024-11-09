import clientRepositories from '../repositories'
import { memberRepositories } from '../../member/repositories/memberRepositories'

export async function activateOne (id: string): Promise<void> {
  await clientRepositories.updateOne(id, { statusId: 1 })
  await memberRepositories.updateMany({ statusId: 1 }, { clientId: id })
}
