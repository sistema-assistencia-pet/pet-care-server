import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { authServices } from '../services/authServices'

export async function loginMember (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_LOGGED_IN = 'Associado logado com sucesso.'

  const { cpf, password }: { cpf: string, password: string } = req.body

  const { accessToken, user } = await authServices.loginMember(cpf, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_LOGGED_IN, user })
}
