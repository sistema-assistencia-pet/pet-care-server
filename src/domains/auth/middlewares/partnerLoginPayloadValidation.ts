import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function partnerLoginPayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const loginPayloadSchema = z.object({
    cnpj: z
      .string({
        invalid_type_error: 'O campo CNPJ ("cnpj") deve ser uma string.',
        required_error: 'O campo CNPJ ("cnpj") é obrigatório.'
      })
      .length(14, {
        message: 'O campo CNPJ ("cnpj") deve ter 14 caracteres.'
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
      cnpj: req.body.cnpj,
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
