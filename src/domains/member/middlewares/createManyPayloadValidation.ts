import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function createManyPayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const createManyPayloadSchema = z.object({
    clientId: z
      .string({
        invalid_type_error: 'O campo ID do Cliente ("clientId") deve ser uma string.',
        required_error: 'O campo ID do Cliente ("clientId") é obrigatório.'
      })
      .uuid({
        message: 'O campo ID do Cliente ("clientId") deve ser um UUID válido.'
      })
  })

  try {
    createManyPayloadSchema.parse({
      clientId: req.params.clientId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
