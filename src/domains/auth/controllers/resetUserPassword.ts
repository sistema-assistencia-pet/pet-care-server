import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { authServices } from '../services/authServices'

export async function resetUserPassword (req: Request, res: Response): Promise<Response> {
  const RESET_PASSWORD_SUCCESSFULLY_CREATED = 'Senha redefinida com sucesso!'

  const { cpf, resetPasswordCode, newPassword }: { cpf: string, resetPasswordCode: string, newPassword: string } = req.body

  await authServices.resetUserPassword(cpf, resetPasswordCode, newPassword)

  return res.status(HttpStatusCode.Created).json({ message: RESET_PASSWORD_SUCCESSFULLY_CREATED })
}
