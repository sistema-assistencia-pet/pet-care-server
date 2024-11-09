import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { authService } from '../services/authServices'

export async function resetMemberPassword (req: Request, res: Response): Promise<Response> {
  const RESET_PASSWORD_SUCCESSFULLY_CREATED = 'Senha redefinida com sucesso!'

  const { cpf, resetPasswordCode, newPassword }: { cpf: string, resetPasswordCode: string, newPassword: string } = req.body

  await authService.resetMemberPassword(cpf, resetPasswordCode, newPassword)

  return res.status(HttpStatusCode.Created).json({ message: RESET_PASSWORD_SUCCESSFULLY_CREATED })
}
