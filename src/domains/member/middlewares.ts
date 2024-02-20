import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../errors'

const validateCreateOnePayload = (req: Request, _res: Response, next: NextFunction): void => {
  const createOnePayloadSchema = z.object({
    birthDate: z
      .string({
        invalid_type_error: '"birthDate" deve ser uma string no formato AAAA-MM-DD.',
        required_error: '"birthDate" é obrigatório e deve estar no formato AAAA-MM-DD.',
      }),

    cep: z
      .string({
        invalid_type_error: '"cep" deve ser uma string.',
        required_error: '"cep" é obrigatório.',
      }),

    clientId: z
      .string({
        invalid_type_error: '"cep" deve ser uma string.',
        required_error: '"cep" é obrigatório.',
      })
      .uuid({
        message: '"clientId" deve ser um UUID válido.',
      }),

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

    phoneNumber: z
      .string({
        invalid_type_error: '"phoneNumber" deve ser uma string.',
        required_error: '"phoneNumber" é obrigatório.',
      })
      .length(11, {
        message: '"phoneNumber" deve ter 11 caracteres.',
      }),

    statusId: z
      .number({
        invalid_type_error: '"statusId" deve ser um number.',
        required_error: '"statusId" é obrigatório.',
      })
      .gte(1, {
        message: '"statusId" deve ser 1, 2 ou 3.',
      })
      .lte(3, {
        message: '"statusId" deve ser 1, 2 ou 3.',
      })
  })

  try {
    createOnePayloadSchema.parse({
      birthDate: req.body.birthDate,
      cep: req.body.cep,
      clientId: req.body.clientId,
      cpf: req.body.cpf,
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      statusId: req.body.statusId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  const birthDateSplitted = req.body.birthDate.split('-')

  if (
    (birthDateSplitted.length !== 3) ||
    (birthDateSplitted[0].length !== 4) ||
    (birthDateSplitted[1].length !== 2) ||
    (birthDateSplitted[2].length !== 2) ||
    (birthDateSplitted.every((substring: any) => isNaN(Number(substring))))
  ) {
    throw new BadRequestError('"birthDate" deve estar no formato AAAA-MM-DD.')
  }

  next()
}

const validatefindOneByIdPayload = (req: Request, _res: Response, next: NextFunction): void => {
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

export default { validateCreateOnePayload, validatefindOneByIdPayload }
