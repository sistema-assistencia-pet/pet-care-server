import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { authService } from '../services/authServices'

export async function loginMember (req: Request, res: Response): Promise<Response> {
  const SUCCESSFULLY_LOGGED_IN = 'Associado logado com sucesso.'

  const { cpf, password }: { cpf: string, password: string } = req.body

  const { accessToken, user } = await authService.loginMember(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: SUCCESSFULLY_LOGGED_IN, user })
}
