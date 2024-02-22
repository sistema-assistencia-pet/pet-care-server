import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../errors'

const validateIdParam = (req: Request, _res: Response, next: NextFunction): void => {
  const createOnePayloadSchema = z.object({
    id: z
      .string({
        invalid_type_error: '"id" deve ser uma string.',
        required_error: '"id" é obrigatório.',
      })
      .uuid({
        message: '"id" deve ser um UUID válido.',
      })
  })

  try {
    createOnePayloadSchema.parse({
      id: req.params['id']
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}

export { validateIdParam }
