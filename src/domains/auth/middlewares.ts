import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../errors'

const validateLoginPayload = (req: Request, _res: Response, next: NextFunction): void => {
  const loginPayloadSchema = z.object({
    cpf: z
      .string({
        invalid_type_error: '"cpf" deve ser uma string.',
        required_error: '"cpf" é obrigatório.',
      })
      .length(11, {
        message: '"cpf" deve ter 11 caracteres.',
      }),

    password: z
      .string({
        invalid_type_error: '"password" deve ser uma string.',
        required_error: '"password" é obrigatório.',
      })
      .min(8, {
        message: '"password" deve ter no mínimo 8 caracteres.',
      })
  })

  try {
    loginPayloadSchema.parse({
      cpf: req.body.cpf,
      password: req.body.password,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}

export default { validateLoginPayload }
