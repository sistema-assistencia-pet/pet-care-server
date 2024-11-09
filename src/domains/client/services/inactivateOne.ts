import clientRepositories from '../repositories'
import { memberRepositories } from '../../member/repositories/memberRepositories'

export async function inactivateOne (id: string): Promise<void> {
  await clientRepositories.updateOne(id, { statusId: 2 })
  await memberRepositories.updateMany({ statusId: 2 }, { clientId: id })
}
