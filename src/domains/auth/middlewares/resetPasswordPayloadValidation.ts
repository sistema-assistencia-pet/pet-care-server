import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function resetPasswordPayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const resetPasswordPayloadSchema = z.object({
    cpf: z
      .string({
        invalid_type_error: 'O campo CPF ("cpf") deve ser uma string.',
        required_error: 'O campo CPF ("cpf") é obrigatório.'
      })
      .length(11, {
        message: 'O campo CPF ("cpf") deve ter 11 caracteres.'
      }),

    resetPasswordCode: z
      .string({
        invalid_type_error: 'O campo Código de Redefinição de Senha ("resetPasswordCode") deve ser uma string.',
        required_error: 'O campo Código de Redefinição de Senha ("resetPasswordCode") é obrigatório.'
      })
      .length(6, {
        message: 'O campo Código de Redefinição de Senha ("resetPasswordCode") deve ter 6 caracteres.'
      }),

    newPassword: z
      .string({
        invalid_type_error: 'O campo Nova Senha ("newPassword") deve ser uma string.',
        required_error: 'O campo Nova Senha ("newPassword") é obrigatório.'
      })
      .min(8, {
        message: 'O campo Nova Senha ("newPassword") deve ter no mínimo 8 caracteres.'
      })
  })

  try {
    resetPasswordPayloadSchema.parse({
      cpf: req.body.cpf,
      resetPasswordCode: req.body.resetPasswordCode,
      newPassword: req.body.newPassword
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
