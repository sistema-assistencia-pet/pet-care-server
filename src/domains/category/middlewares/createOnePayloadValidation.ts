import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function createOnePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const createOnePayloadSchema = z.object({
    name: z
      .string({
        invalid_type_error: 'O campo Nome ("name") deve ser uma string.',
        required_error: 'O campo Nome ("name") é obrigatório.'
      })
  })

  try {
    createOnePayloadSchema.parse({
      name: req.body.name,
      stateId: req.body.stateId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
