import { status } from '../../../enums/statusEnum'
import { userRepositories } from '../repositories/userRepositories'

export async function activateOne (userToBeActivatedId: string): Promise<string> {
  const userId = await userRepositories.updateOne(userToBeActivatedId, { statusId: status.ACTIVE })

  return userId
}
