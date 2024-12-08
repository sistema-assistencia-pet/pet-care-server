import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export async function validateOnePayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const validateOnePayloadSchema = z.object({
    code: z
      .string({
        invalid_type_error: 'O campo Código ("code") deve ser uma string.',
        required_error: 'O campo Código ("code") é obrigatório.'
      }),

    memberCpf: z
      .string({
        invalid_type_error: 'O campo CPF do Associado ("memberCpf") deve ser uma string.',
        required_error: 'O campo CPF do Associado ("memberCpf") é obrigatório.'
      })
      .length(11, {
        message: 'O campo CPF do Associado ("memberCpf") deve ter 11 caracteres.'
      })
  })

  try {
    validateOnePayloadSchema.parse({
      code: req.body.code,
      memberCpf: req.body.memberCpf
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
