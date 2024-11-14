import bcrypt from 'bcrypt'

import { userRepositories } from '../repositories/userRepositories'
import { type UserToBeCreated } from '../userInterfaces'

export async function createOne (userToBeCreated: UserToBeCreated): Promise<string> {
  const encryptedPassword = await bcrypt.hash(userToBeCreated.password, 10)

  userToBeCreated.password = encryptedPassword

  const user = await userRepositories.createOne(userToBeCreated)

  return user.id
}
