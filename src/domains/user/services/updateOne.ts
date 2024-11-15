import { userRepositories } from '../repositories/userRepositories'
import { type UserToBeUpdated } from '../userInterfaces'

export async function updateOne (userToBeUpdatedId: string, userToBeUpdated: UserToBeUpdated): Promise<string> {
  const userId = await userRepositories.updateOne(userToBeUpdatedId, userToBeUpdated)

  return userId
}
