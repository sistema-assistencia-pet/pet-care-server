import bcrypt from 'bcrypt'

import { ForbiddenError } from '../../../errors'
import { type RequestUserData } from '../../../interfaces'
import { role } from '../../../enums/roleEnum'
import { userRepositories } from '../repositories/userRepositories'
import { type UserToBeCreated } from '../interfaces'

function checkIfIsCreatingMaster (userToBeCreated: UserToBeCreated): void {
  if (userToBeCreated.roleId === role.MASTER) throw new ForbiddenError('Usuários de cliente não podem criar usuários master.')
}

function checkIfIsSameClientId (requestUserData: RequestUserData, userToBeCreated: UserToBeCreated): void {
  if (requestUserData.clientId !== userToBeCreated.clientId) {
    throw new ForbiddenError('Operação não permitida. Usuários Admin de Cliente somente podem criar usuários para o mesmo Cliente.')
  }
}

async function createOne (requestUserData: RequestUserData, userToBeCreated: UserToBeCreated): Promise<string> {
  if (requestUserData.roleId === role.CLIENT_ADMIN) {
    checkIfIsCreatingMaster(userToBeCreated)
    checkIfIsSameClientId(requestUserData, userToBeCreated)
  }

  const encryptedPassword = await bcrypt.hash(userToBeCreated.password, 10)

  userToBeCreated.password = encryptedPassword

  const user = await userRepositories.createOne(userToBeCreated)

  return user.id
}

export { createOne }
