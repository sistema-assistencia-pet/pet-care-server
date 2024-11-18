import * as bcrypt from 'bcrypt'

import { BadRequestError, UnauthorizedError } from '../../../errors'
import { userRepositories } from '../../user/repositories/userRepositories'
import { status } from '../../../enums/status'

export async function resetUserPassword (cpf: string, resetPasswordCode: string, newPassword: string): Promise<void> {
  const INVALID_RESET_PASSWORD_CODE = 'Código de redefinição de senha inválido.'
  const USER_DID_NOT_REQUESTED_PASSWORD_RESET = 'Usuário ainda não requisitou o código de redefinição de senha.'
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const user = await userRepositories.findOne({ cpf }, { statusId: status.ACTIVE })

  if (user === null) throw new UnauthorizedError(USER_NOT_FOUND)

  const resetPasswordCodeData = await userRepositories.findOneResetPasswordCode(user.id)

  if (resetPasswordCodeData === null) throw new BadRequestError(USER_DID_NOT_REQUESTED_PASSWORD_RESET)

  const encryptedResetPasswordCode = resetPasswordCodeData.resetCode

  const isResetPasswordCodeValid = await bcrypt.compare(resetPasswordCode, encryptedResetPasswordCode)

  if (!isResetPasswordCodeValid) throw new UnauthorizedError(INVALID_RESET_PASSWORD_CODE)

  const encryptedPassword = await bcrypt.hash(newPassword, 10)

  await userRepositories.updateOne(user.id, { password: encryptedPassword })

  await userRepositories.deleteOneResetPasswordCode(user.id)
}
