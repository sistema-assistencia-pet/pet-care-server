import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../errors'

const validateCreateOnePayload = (req: Request, _res: Response, next: NextFunction): void => {
  const createOnePayloadSchema = z.object({
    cpf: z
      .string({
        invalid_type_error: '"cpf" deve ser uma string.',
        required_error: '"cpf" é obrigatório.',
      })
      .length(11, {
        message: '"cpf" deve ter 11 caracteres.',
      }),

    email: z
      .string({
        invalid_type_error: '"email" deve ser uma string.',
        required_error: '"email" é obrigatório.',
      })
      .email({
        message: '"email" deve ser um e-mail válido.',
      }),

    name: z
      .string({
        invalid_type_error: '"name" deve ser uma string.',
        required_error: '"name" é obrigatório.',
      })
      .min(3, {
        message: '"name" deve ter 3 caracteres.',
      }),

    password: z
      .string({
        invalid_type_error: '"password" deve ser uma string.',
        required_error: '"password" é obrigatório.',
      })
      .min(8, {
        message: '"password" deve ter no mínimo 8 caracteres.',
      }),

    roleId: z
      .number({
        invalid_type_error: '"roleId" deve ser um number.',
        required_error: '"roleId" é obrigatório.',
      })
      .gte(1, {
        message: '"roleId" deve ser 1 ou 2.',
      })
      .lte(2, {
        message: '"roleId" deve ser 1 ou 2.',
      })
  })

  try {
    createOnePayloadSchema.parse({
      cpf: req.body.cpf,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
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

export default { validateCreateOnePayload }
