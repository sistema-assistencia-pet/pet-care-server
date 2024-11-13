import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../errors'

export function validateNumberIdParam (req: Request, _res: Response, next: NextFunction): void {
  const idParamSchema = z.object({
    id: z
      .number({
        invalid_type_error: '"id" deve ser um number.',
        required_error: '"id" é obrigatório.'
      })
  })

  try {
    idParamSchema.parse({
      id: typeof parseInt(req.params.id) === 'number' ? parseInt(req.params.id) : null
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
