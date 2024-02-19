import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import authService from './services'

const SUCCESSFULLY_LOGGED_IN = 'Usuário logado com sucesso.'

const login = async (req: Request, res: Response): Promise<Response> => {
  const { cpf, password } = req.body

  const { accessToken, user } = await authService.login(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_LOGGED_IN, user })
}

export default { login }
