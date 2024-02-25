import bcrypt from 'bcrypt'

import { type UserToBeCreated } from './interfaces'
import userRepositories from './repositories'

const createOne = async (userToBeCreated: UserToBeCreated): Promise<string> => {
  const encryptedPassword = await bcrypt.hash(userToBeCreated.password, 10)

  userToBeCreated.password = encryptedPassword

  const user = await userRepositories.createOne(userToBeCreated)

  return user.id
}

export default { createOne }
