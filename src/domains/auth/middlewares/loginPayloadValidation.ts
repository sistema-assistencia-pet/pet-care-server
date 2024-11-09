import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function loginPayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const loginPayloadSchema = z.object({
    cpf: z
      .string({
        invalid_type_error: 'O campo CPF ("cpf") deve ser uma string.',
        required_error: 'O campo CPF ("cpf") é obrigatório.'
      })
      .length(11, {
        message: 'O campo CPF ("cpf") deve ter 11 caracteres.'
      }),

    password: z
      .string({
        invalid_type_error: 'O campo Senha ("password") deve ser uma string.',
        required_error: 'O campo Senha ("password") é obrigatório.'
      })
      .min(8, {
        message: 'O campo Senha ("password") deve ter pelo menos 8 caracteres.'
      })
  })

  try {
    loginPayloadSchema.parse({
      cpf: req.body.cpf,
      password: req.body.password
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
