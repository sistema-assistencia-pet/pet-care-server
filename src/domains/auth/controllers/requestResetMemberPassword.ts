import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { authService } from '../services/authServices'

export async function requestResetMemberPassword (req: Request, res: Response): Promise<Response> {
  const RESET_PASSWORD_REQUESTED_SUCCESSFULLY = 'Redefinição de senha requisitada com sucesso. Por favor, verifique o código de acesso enviado em seu email.'

  const { cpf }: { cpf: string } = req.body

  await authService.requestResetMemberPassword(cpf)

  return res.status(HttpStatusCode.Ok).json({ message: RESET_PASSWORD_REQUESTED_SUCCESSFULLY })
}
