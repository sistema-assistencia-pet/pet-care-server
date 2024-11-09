import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'
import { role } from '../../../enums/roleEnum'

export function createOnePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
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

    cpf: z
      .string({
        invalid_type_error: 'O campo CPF ("cpf") deve ser uma string.',
        required_error: 'O campo CPF ("cpf") é obrigatório.'
      })
      .length(11, {
        message: 'O campo CPF ("cpf") deve ter 11 caracteres.'
      }),

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

    password: z
      .string({
        invalid_type_error: 'O campo Senha ("password") deve ser uma string.',
        required_error: 'O campo Senha ("password") é obrigatório.'
      })
      .min(8, {
        message: 'O campo Senha ("password") deve ter pelo menos 8 caracteres.'
      }),

    roleId: z
      .number({
        invalid_type_error: 'O campo Cargo ("roleId") deve ser um number.',
        required_error: 'O campo Cargo ("roleId") é obrigatório.'
      })
      .gte(2, {
        message: 'O campo Cargo ("roleId") deve ser 1 (MASTER) ou 2 (CLIENT_ADMIN).'
      })
      .lte(3, {
        message: 'O campo Cargo ("roleId") deve ser 1 (MASTER) ou 2 (CLIENT_ADMIN).'
      })
  })

  try {
    createOnePayloadSchema.parse({
      clientId: req.body.clientId,
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

  if (
    (req.body.roleId === role.CLIENT_ADMIN) &&
    (req.body.clientId === null)
  ) throw new BadRequestError('Ao criar um usuário Admin de Cliente ("roleId" = 3), um Id de Cliente ("clientId") deve ser informado.')

  next()
}
