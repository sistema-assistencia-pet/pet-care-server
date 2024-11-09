import * as bcrypt from 'bcrypt'
import { randomBytes } from 'node:crypto'

import { UnauthorizedError } from '../../../errors'
import { memberRepositories } from '../../member/repositories/memberRepositories'
import { sendEmail } from '../../../utils/mailer'
import { systemName } from '../../../apiConfig'

export async function generateResetPasswordCode (memberId: string): Promise<string> {
  const resetPasswordCode = randomBytes(3).toString('hex')

  const encryptedResetPasswordCode = await bcrypt.hash(resetPasswordCode, 10)

  await memberRepositories.upsertOneResetPasswordCode(memberId, encryptedResetPasswordCode)

  return resetPasswordCode
}

export async function sendResetPasswordCode (email: string, resetPasswordCode: string, name: string): Promise<void> {
  const SUBJECT = `${systemName} - Redefina sua senha!`
  const BODY = `Olá, ${name}! Seu código de acesso é: ${resetPasswordCode}. Utilize-o para redefinir sua senha.`

  const mailSent = await sendEmail(SUBJECT, BODY, email)

  logger.debug(mailSent, 'Resposta do envio do email.')
}

export async function requestResetMemberPassword (cpf: string): Promise<void> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneByCpf(cpf)

  if (member === null) throw new UnauthorizedError(MEMBER_NOT_FOUND)

  const resetPasswordCode = await generateResetPasswordCode(member.id)

  await sendResetPasswordCode(member.email, resetPasswordCode, member.name)

  logger.debug({ resetPasswordCode }, 'Código de acesso gerado.')
}
