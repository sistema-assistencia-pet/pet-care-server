import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export async function createOnePayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const createOnePayloadSchema = z.object({
    title: z
      .string({
        invalid_type_error: 'O campo Título ("title") deve ser uma string.',
        required_error: 'O campo Título ("title") é obrigatório.'
      }),

    description: z
      .string({
        invalid_type_error: 'O campo Descrição ("description") deve ser uma string.',
        required_error: 'O campo Descrição ("description") é obrigatório.'
      })
      .optional(),

    rules: z
      .string({
        invalid_type_error: 'O campo Regras ("rules") deve ser uma string.',
        required_error: 'O campo Regras ("rules") é obrigatório.'
      })
      .optional(),

    value: z
      .number({
        invalid_type_error: 'O campo Valor ("value") deve ser um number.',
        required_error: 'O campo Valor ("value") é obrigatório.'
      }),

    partnerId: z
      .string({
        invalid_type_error: 'O campo Id do Parceiro ("partnerId") deve ser uma string.',
        required_error: 'O campo Id do Parceiro ("partnerId") é obrigatório.'
      })
      .uuid({
        message: 'O campo Id do Parceiro ("partnerId") deve ser um UUID válido.'
      })
  })

  try {
    createOnePayloadSchema.parse({
      title: req.body.title,
      description: req.body.description,
      rules: req.body.rules,
      value: req.body.value,
      partnerId: req.body.partnerId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
