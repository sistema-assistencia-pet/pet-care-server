import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import authService from './services'

const loginAdmin = async (req: Request, res: Response): Promise<Response> => {
  const SUCCESSFULLY_LOGGED_IN = 'Usuário logado com sucesso.'

  const { cpf, password } = req.body

  const { accessToken, user } = await authService.loginAdmin(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_LOGGED_IN, user })
}

const loginMember = async (req: Request, res: Response): Promise<Response> => {
  const SUCCESSFULLY_LOGGED_IN = 'Associado logado com sucesso.'

  const { cpf, password } = req.body

  const { accessToken, user } = await authService.loginMember(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_LOGGED_IN, user })
}

const createMemberFirstAccess = async (req: Request, res: Response): Promise<Response> => {
  const SUCCESSFULLY_FIRST_ACCESS = 'Primeiro acesso realizado com sucesso. Por favor, verifique o código de acesso enviado em seu email.'

  const { cpf } = req.body

  await authService.createMemberFirstAccess(cpf)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_FIRST_ACCESS })
}

const createMemberFirstPassword = async (req: Request, res: Response): Promise<Response> => {
  const FIRST_PASSWORD_SUCCESSFULLY_CREATED = 'Senha criada com sucesso!'

  const { cpf, firstAccessCode, newPassword } = req.body

  await authService.createMemberFirstPassword(cpf, firstAccessCode, newPassword)

  return res.status(HttpStatusCode.Created).json({ message: FIRST_PASSWORD_SUCCESSFULLY_CREATED })
}

export default {
  createMemberFirstAccess,
  createMemberFirstPassword,
  loginAdmin,
  loginMember
}
