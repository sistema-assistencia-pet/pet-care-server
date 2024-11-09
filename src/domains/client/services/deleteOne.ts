import clientRepositories from '../repositories'
import { memberRepositories } from '../../member/repositories/memberRepositories'

export async function deleteOne (id: string): Promise<void> {
  await clientRepositories.updateOne(id, { statusId: 3 })
  await memberRepositories.updateMany({ statusId: 3 }, { clientId: id })
}
