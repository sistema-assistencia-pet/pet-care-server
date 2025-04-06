import * as bcrypt from 'bcrypt'
import { randomBytes } from 'node:crypto'

import { userRepositories } from '../../user/repositories/userRepositories'
import { sendEmail } from '../../../utils/mailer'
import { SYSTEM_NAME } from '../../../apiConfig'
import { UnauthorizedError } from '../../../errors'
import { status } from '../../../enums/status'

export async function generateResetPasswordCode (userId: string): Promise<string> {
  const resetPasswordCode = randomBytes(3).toString('hex')

  const encryptedResetPasswordCode = await bcrypt.hash(resetPasswordCode, 10)

  await userRepositories.upsertOneResetPasswordCode(userId, encryptedResetPasswordCode)

  return resetPasswordCode
}

export async function sendResetPasswordCode (email: string, resetPasswordCode: string, name: string): Promise<void> {
  const SUBJECT = `${SYSTEM_NAME} - Redefina sua senha!`
  const BODY = `Olá, ${name}! Seu código de acesso é: ${resetPasswordCode}. Utilize-o para redefinir sua senha.`

  const mailSent = await sendEmail(SUBJECT, BODY, email)

  logger.debug(mailSent, 'Resposta do envio do email.')
}

export async function requestResetUserPassword (cpf: string): Promise<void> {
  const USER_NOT_FOUND = 'Usuário não encontrado.'
  const USER_EMAIL_NOT_FOUND = 'Usuário não possui email cadastrado.'

  const user = await userRepositories.findOne({ cpf }, { statusId: status.ACTIVE })

  if (user === null) throw new UnauthorizedError(USER_NOT_FOUND)
  if (user.email === null) throw new UnauthorizedError(USER_EMAIL_NOT_FOUND)

  const resetPasswordCode = await generateResetPasswordCode(user.id)

  await sendResetPasswordCode(user.email, resetPasswordCode, user.name ?? '')

  logger.debug({ resetPasswordCode }, 'Código de acesso gerado.')
}
