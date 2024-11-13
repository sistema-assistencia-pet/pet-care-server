import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function findManyQueryParamsValidation (req: Request, _res: Response, next: NextFunction): void {
  const findManyQueryParamsSchema = z.object({
    searchInput: z
      .string({
        invalid_type_error: 'O campo Busca ("searchInput") deve ser uma string.',
        required_error: 'O campo Busca ("searchInput") é obrigatório.'
      })
      .optional(),

    stateId: z
      .number({
        invalid_type_error: 'O campo Id do Estado ("stateId") deve ser um number.',
        required_error: 'O campo Id do Estado ("stateId") é obrigatório.'
      })
      .optional()
  })

  try {
    findManyQueryParamsSchema.parse({
      searchInput: req.query['search-input'] ?? '',
      stateId: typeof req.query['state-id'] === 'string' ? parseInt(req.query['state-id']) : undefined
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
