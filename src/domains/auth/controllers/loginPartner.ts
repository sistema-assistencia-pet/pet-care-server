import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { authServices } from '../services/authServices'

export async function loginPartner (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_LOGGED_IN = 'Estabelecimento logado com sucesso.'

  const { cnpj, password }: { cnpj: string, password: string } = req.body

  const { accessToken, user } = await authServices.loginPartner(cnpj, password)

  res.setHeader('access-token', accessToken)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_LOGGED_IN, user })
}
