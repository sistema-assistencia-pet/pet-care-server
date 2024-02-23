import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../errors'

const validateCreateOnePayload = (req: Request, _res: Response, next: NextFunction): void => {
  const createOnePayloadSchema = z.object({
    cnpj: z
      .string({
        invalid_type_error: '"cnpj" deve ser uma string.',
        required_error: '"cnpj" é obrigatório.',
      })
      .length(14, {
        message: '"cnpj" deve ter 14 caracteres.',
      }),

    corporateName: z
      .string({
        invalid_type_error: '"corporateName" deve ser uma string.',
        required_error: '"corporateName" é obrigatório.',
      })
      .min(3, {
        message: '"corporateName" deve ter pelo menos 3 caracteres.',
      }),

    fantasyName: z
      .string({
        invalid_type_error: '"fantasyName" deve ser uma string.',
        required_error: '"fantasyName" é obrigatório.',
      })
      .min(3, {
        message: '"fantasyName" deve ter pelo menos 3 caracteres.',
      }),

    segment: z
      .string({
        invalid_type_error: '"segment" deve ser uma string.',
        required_error: '"segment" é obrigatório.',
      })
      .min(3, {
        message: '"segment" deve ter pelo menos 3 caracteres.',
      }),

    address: z
      .string({
        invalid_type_error: '"address" deve ser uma string.',
        required_error: '"address" é obrigatório.',
      })
      .min(1, {
        message: '"address" deve ter pelo menos 3 caracteres.',
      }),

    state: z
      .string({
        invalid_type_error: '"state" deve ser uma string.',
        required_error: '"state" é obrigatório.',
      })
      .length(2, {
        message: '"state" deve ter 2 caracteres.',
      }),

    city: z
      .string({
        invalid_type_error: '"city" deve ser uma string.',
        required_error: '"city" é obrigatório.',
      })
      .min(3, {
        message: '"city" deve ter pelo menos 3 caracteres.',
      }),

    managerName: z
      .string({
        invalid_type_error: '"managerName" deve ser uma string.',
        required_error: '"managerName" é obrigatório.',
      })
      .min(3, {
        message: '"managerName" deve ter pelo menos 3 caracteres.',
      }),

    managerPhoneNumber: z
      .string({
        invalid_type_error: '"managerPhoneNumber" deve ser uma string.',
        required_error: '"managerPhoneNumber" é obrigatório.',
      })
      .length(11, {
        message: '"managerPhoneNumber" deve ter 11 caracteres.',
      }),

    managerEmail: z
      .string({
        invalid_type_error: '"managerEmail" deve ser uma string.',
        required_error: '"managerEmail" é obrigatório.',
      })
      .email({
        message: '"managerEmail" deve ser um e-mail válido.',
      }),

    financePhoneNumber: z
      .string({
        invalid_type_error: '"financePhoneNumber" deve ser uma string.',
        required_error: '"financePhoneNumber" é obrigatório.',
      })
      .length(11, {
        message: '"financePhoneNumber" deve ter 11 caracteres.',
      }),

    lumpSum: z
      .number({
        invalid_type_error: '"lumpSum" deve ser um number.',
        required_error: '"lumpSum" é obrigatório.',
      })
      .gte(0, {
        message: '"lumpSum" deve ser maior ou igual a 0.',
      })
      .optional(),

    unitValue: z
      .number({
        invalid_type_error: '"unitValue" deve ser um number.',
        required_error: '"unitValue" é obrigatório.',
      })
      .gte(0, {
        message: '"unitValue" deve ser maior ou igual a 0.',
      })
      .optional(),

    contractUrl: z
      .string({
        invalid_type_error: '"contractUrl" deve ser uma string.',
        required_error: '"contractUrl" é obrigatório.',
      })
      .min(3, {
        message: '"contractUrl" deve ter pelo menos 3 caracteres.',
      })
      .optional(),

    statusId: z
      .number({
        invalid_type_error: '"statusId" deve ser um number.',
        required_error: '"statusId" é obrigatório.',
      })
      .gte(1, {
        message: '"statusId" deve 1, 2 ou 3.',
      })
      .lte(3, {
        message: '"statusId" deve 1, 2 ou 3.',
      })
  })

  try {
    createOnePayloadSchema.parse({
      cnpj: req.body.cnpj,
      corporateName: req.body.corporateName,
      fantasyName: req.body.fantasyName,
      segment: req.body.segment,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      managerName: req.body.managerName,
      managerPhoneNumber: req.body.managerPhoneNumber,
      managerEmail: req.body.managerEmail,
      financePhoneNumber: req.body.financePhoneNumber,
      lumpSum: req.body.lumpSum,
      unitValue: req.body.unitValue,
      contractUrl: req.body.contractUrl,
      statusId: req.body.statusId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}

const validatefindManyPayload = (req: Request, _res: Response, next: NextFunction): void => {
  const createOnePayloadSchema = z.object({
    clientCnpj: z
      .string({
        invalid_type_error: '"clientCnpj " deve ser uma string.',
        required_error: '"clientCnpj " é obrigatório.',
      })
      .length(14, {
        message: '"clientCnpj" deve ter no mínimo 3 caracteres.',
      })
      .optional(),

    cpf: z
      .string({
        invalid_type_error: '"cpf" deve ser uma string.',
        required_error: '"cpf" é obrigatório.',
      })
      .length(11, {
        message: '"cpf" deve ter no mínimo 3 caracteres.',
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
        message: '"name" deve ter no mínimo 3 caracteres.',
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
    createOnePayloadSchema.parse({
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

export default { validateCreateOnePayload, validatefindManyPayload }
