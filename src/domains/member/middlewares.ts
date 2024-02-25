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
      })
      .length(8, {
        message: '"cep" deve ter 8 caracteres.',
      }),

    clientId: z
      .string({
        invalid_type_error: '"clientId" deve ser uma string.',
        required_error: '"clientId" é obrigatório.',
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
        message: '"name" deve ter pelo menos 3 caracteres.',
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

const validatefindManyQueryParams = (req: Request, _res: Response, next: NextFunction): void => {
  const findManyQueryParamsSchema = z.object({
    clientCnpj: z
      .string({
        invalid_type_error: '"clientCnpj " deve ser uma string.',
        required_error: '"clientCnpj " é obrigatório.',
      })
      .length(14, {
        message: '"clientCnpj" deve ter 14 caracteres.',
      })
      .optional(),

    cpf: z
      .string({
        invalid_type_error: '"cpf" deve ser uma string.',
        required_error: '"cpf" é obrigatório.',
      })
      .length(11, {
        message: '"cpf" deve ter 11 caracteres.',
      })
      .optional(),

    take: z
      .number({
        invalid_type_error: '"take" deve ser um number.',
        required_error: '"take" é obrigatório.',
      })
      .gte(1, {
        message: '"take" deve ser maior que 0.',
      })
      .lte(50, {
        message: '"take" deve ser menor ou igual a 50.',
      }),

    name: z
      .string({
        invalid_type_error: '"name" deve ser uma string.',
        required_error: '"name" é obrigatório.',
      })
      .min(3, {
        message: '"name" deve ter pelo menos 3 caracteres.',
      })
      .optional(),

    skip: z
      .number({
        invalid_type_error: '"skip" deve ser um number.',
        required_error: '"skip" é obrigatório.',
      })
      .gte(0, {
        message: '"skip" deve ser maior ou igual a 0.',
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
      .optional()
  })

  try {
    findManyQueryParamsSchema.parse({
      clientCnpj: req.query['clientCnpj'],
      cpf: req.query['cpf'],
      take: typeof req.query['take'] === 'string' ? parseInt(req.query['take']) : undefined,
      name: req.query['name'],
      skip: typeof req.query['skip'] === 'string' ? parseInt(req.query['skip']) : undefined,
      statusId: typeof req.query['statusId'] === 'string' ? parseInt(req.query['statusId']) : undefined
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}

export default { validateCreateOnePayload, validatefindManyQueryParams }
