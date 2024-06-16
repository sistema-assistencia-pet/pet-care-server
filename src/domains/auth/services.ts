import * as bcrypt from 'bcrypt'
import { createSecretKey, randomBytes } from 'node:crypto'
import { SignJWT } from 'jose'

import { BadRequestError, UnauthorizedError } from '../../errors'
import { getEnvironmentVariable } from '../../utils/getEnvironmentVariable'
import { type ILoginResponse } from './interfaces'
import memberRepositories from '../member/repositories'
import { role } from '../../enums/roleEnum'
import { sendEmail } from '../../utils/mailer'
import userRepositories from '../user/repositories'
import { systemName } from '../../apiConfig'

const generateAccessToken = async (id: string, roleId: number): Promise<string> => {
  const JWT_SECRET = getEnvironmentVariable('JWT_SECRET')
  const JWT_ISSUER = getEnvironmentVariable('JWT_ISSUER')
  const JWT_AUDIENCE = getEnvironmentVariable('JWT_AUDIENCE')

  const secretKey = createSecretKey(JWT_SECRET, 'utf8')

  const accessToken = await new SignJWT({ id, roleId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('240m')
    .sign(secretKey)

  return accessToken
}

const loginAdmin = async (cpf: string, password: string): Promise<ILoginResponse> => {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const user = await userRepositories.findOneByCpf(cpf)

  if (user === null || user.roleId !== role.ADMIN) {
    logger.error({ cpf }, USER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const accessToken = await generateAccessToken(user.id, user.roleId)

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      roleId: user.roleId
    }
  }
}

const loginMember = async (cpf: string, password: string): Promise<ILoginResponse> => {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'
  const MEMBER_WITHOUT_PASSWORD = 'Associado ainda não criou a senha. Por favor, realize o primeiro acesso.'

  const member = await memberRepositories.findOneByCpf(cpf)

  if (member === null) {
    logger.error({ cpf }, MEMBER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  if (!member.createdPassword || member.password === null) throw new UnauthorizedError(MEMBER_WITHOUT_PASSWORD)

  const isPasswordValid = await bcrypt.compare(password, member.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const accessToken = await generateAccessToken(member.id, role.MEMBER)

  return {
    accessToken,
    user: {
      id: member.id,
      name: member.name,
      roleId: role.MEMBER
    }
  }
}

const generateResetPasswordCode = async (memberId: string): Promise<string> => {
  const resetPasswordCode = randomBytes(3).toString('hex')

  const encryptedResetPasswordCode = await bcrypt.hash(resetPasswordCode, 10)

  await memberRepositories.upsertOneResetPasswordCode(memberId, encryptedResetPasswordCode)

  return resetPasswordCode
}

const sendResetPasswordCode = async (email: string, resetPasswordCode: string, name: string): Promise<void> => {
  const SUBJECT = `${systemName} - Redefina sua senha!`
  const BODY = `Olá, ${name}! Seu código de acesso é: ${resetPasswordCode}. Utilize-o para redefinir sua senha.`

  const mailSent = await sendEmail(SUBJECT, BODY, email)

  logger.debug(mailSent, 'Resposta do envio do email.')
}

const requestResetMemberPassword = async (cpf: string): Promise<void> => {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const member = await memberRepositories.findOneByCpf(cpf)

  if (member === null) throw new UnauthorizedError(MEMBER_NOT_FOUND)

  const resetPasswordCode = await generateResetPasswordCode(member.id)

  await sendResetPasswordCode(member.email, resetPasswordCode, member.name)

  logger.debug({ resetPasswordCode }, 'Código de acesso gerado.')
}

const resetMemberPassword = async (cpf: string, resetPasswordCode: string, newPassword: string): Promise<void> => {
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

export default {
  loginAdmin,
  loginMember,
  resetMemberPassword,
  requestResetMemberPassword
}
