import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function updateOnePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const createOnePayloadSchema = z.object({
    clientId: z
      .string({
        invalid_type_error: 'O campo Id do Cliente ("clientId") deve ser uma string.',
        required_error: 'O campo Id do Cliente ("clientId") é obrigatório.'
      })
      .uuid({
        message: 'O campo Id do Cliente ("clientId") deve ser um UUID válido.'
      })
      .nullable(),

    email: z
      .string({
        invalid_type_error: 'O campo E-mail ("email") deve ser uma string.',
        required_error: 'O campo E-mail ("email") é obrigatório.'
      })
      .email({
        message: 'O campo E-mail ("email") deve ser um e-mail válido.'
      }),

    name: z
      .string({
        invalid_type_error: 'O campo Nome ("name") deve ser uma string.',
        required_error: 'O campo Nome ("name") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome ("name") deve ter pelo menos 3 caracteres.'
      }),

    roleId: z
      .number({
        invalid_type_error: 'O campo Cargo ("roleId") deve ser um number.',
        required_error: 'O campo Cargo ("roleId") é obrigatório.'
      })
      .gte(2, {
        message: 'O campo Cargo ("roleId") deve ser 2 (MASTER) ou 3 (CLIENT_ADMIN).'
      })
      .lte(3, {
        message: 'O campo Cargo ("roleId") deve ser 2 (MASTER) ou 3 (CLIENT_ADMIN).'
      })
  })

  try {
    createOnePayloadSchema.parse({
      clientId: req.body.clientId,
      email: req.body.email,
      name: req.body.name,
      roleId: req.body.roleId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
