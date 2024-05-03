import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import authService from './services'

const loginAdmin = async (req: Request, res: Response): Promise<Response> => {
  const SUCCESSFULLY_LOGGED_IN = 'Usuário logado com sucesso.'

  const { cpf, password }: { cpf: string, password: string } = req.body

  const { accessToken, user } = await authService.loginAdmin(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_LOGGED_IN, user })
}

const loginMember = async (req: Request, res: Response): Promise<Response> => {
  const SUCCESSFULLY_LOGGED_IN = 'Associado logado com sucesso.'

  const { cpf, password }: { cpf: string, password: string } = req.body

  const { accessToken, user } = await authService.loginMember(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_LOGGED_IN, user })
}

const requestResetMemberPassword = async (req: Request, res: Response): Promise<Response> => {
  const RESET_PASSWORD_REQUESTED_SUCCESSFULLY = 'Redefinição de senha requisitada com sucesso. Por favor, verifique o código de acesso enviado em seu email.'

  const { cpf }: { cpf: string } = req.body

  await authService.requestResetMemberPassword(cpf)

  return res.status(HttpStatusCode.Ok).json({ message: RESET_PASSWORD_REQUESTED_SUCCESSFULLY })
}

const resetMemberPassword = async (req: Request, res: Response): Promise<Response> => {
  const RESET_PASSWORD_SUCCESSFULLY_CREATED = 'Senha redefinida com sucesso!'

  const { cpf, resetPasswordCode, newPassword }: { cpf: string, resetPasswordCode: string, newPassword: string } = req.body

  await authService.resetMemberPassword(cpf, resetPasswordCode, newPassword)

  return res.status(HttpStatusCode.Created).json({ message: RESET_PASSWORD_SUCCESSFULLY_CREATED })
}

export default {
  loginAdmin,
  loginMember,
  resetMemberPassword,
  requestResetMemberPassword
}
