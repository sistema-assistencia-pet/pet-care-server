import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function requestResetMemberPasswordPayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const memberRequestResetPasswordPayloadSchema = z.object({
    cpf: z
      .string({
        invalid_type_error: 'O campo CPF ("cpf") deve ser uma string.',
        required_error: 'O campo CPF ("cpf") é obrigatório.'
      })
      .length(11, {
        message: 'O campo CPF ("cpf") deve ter 11 caracteres.'
      })
  })

  try {
    memberRequestResetPasswordPayloadSchema.parse({
      cpf: req.body.cpf
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
