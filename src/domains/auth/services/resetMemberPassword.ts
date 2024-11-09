import * as bcrypt from 'bcrypt'

import { BadRequestError, UnauthorizedError } from '../../../errors'
import { memberRepositories } from '../../member/repositories/memberRepositories'

export async function resetMemberPassword (cpf: string, resetPasswordCode: string, newPassword: string): Promise<void> {
  const INVALID_RESET_PASSWORD_CODE = 'Código de redefinição de senha inválido.'
  const MEMBER_DID_NOT_REQUESTED_PASSWORD_RESET = 'Associado ainda não requisitou o código de redefinição de senha.'
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneByCpf(cpf)

  if (member === null) throw new UnauthorizedError(MEMBER_NOT_FOUND)

  const resetPasswordCodeData = await memberRepositories.findOneResetPasswordCode(member.id)

  if (resetPasswordCodeData === null) throw new BadRequestError(MEMBER_DID_NOT_REQUESTED_PASSWORD_RESET)

  const encryptedResetPasswordCode = resetPasswordCodeData.resetCode

  const isResetPasswordCodeValid = await bcrypt.compare(resetPasswordCode, encryptedResetPasswordCode)

  if (!isResetPasswordCodeValid) throw new UnauthorizedError(INVALID_RESET_PASSWORD_CODE)

  const encryptedPassword = await bcrypt.hash(newPassword, 10)

  await memberRepositories.updateOne(member.id, { password: encryptedPassword, createdPassword: true })

  await memberRepositories.deleteOneResetPasswordCode(member.id)
}
