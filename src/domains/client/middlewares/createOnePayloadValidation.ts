import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function createOnePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const createOnePayloadSchema = z.object({
    cnpj: z
      .string({
        invalid_type_error: 'O campo CNPJ ("cnpj") deve ser uma string.',
        required_error: 'O campo CNPJ ("cnpj") é obrigatório.'
      })
      .length(14, {
        message: 'O campo CNPJ ("cnpj") deve ter 14 caracteres.'
      }),

    corporateName: z
      .string({
        invalid_type_error: 'O campo Razão Social ("corporateName") deve ser uma string.',
        required_error: 'O campo Razão Social ("corporateName") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Razão Social ("corporateName") deve ter pelo menos 3 caracteres.'
      }),

    fantasyName: z
      .string({
        invalid_type_error: 'O campo Nome Fantasia ("fantasyName") deve ser uma string.',
        required_error: 'O campo Nome Fantasia ("fantasyName") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome Fantasia ("fantasyName") deve ter pelo menos 3 caracteres.'
      }),

    segment: z
      .string({
        invalid_type_error: 'O campo Segmento ("segment") deve ser uma string.',
        required_error: 'O campo Segmento ("segment") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Segmento ("segment") deve ter pelo menos 3 caracteres.'
      }),

    address: z
      .string({
        invalid_type_error: 'O campo Endereço ("address") deve ser uma string.',
        required_error: 'O campo Endereço ("address") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Endereço ("address") deve ter pelo menos 3 caracteres.'
      }),

    state: z
      .string({
        invalid_type_error: 'O campo Estado ("state") deve ser uma string.',
        required_error: 'O campo Estado ("state") é obrigatório.'
      })
      .length(2, {
        message: 'O campo Estado ("state") deve ter 2 caracteres.'
      }),

    city: z
      .string({
        invalid_type_error: 'O campo Cidade ("city") deve ser uma string.',
        required_error: 'O campo Cidade ("city") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Cidade ("city") deve ter pelo menos 3 caracteres.'
      }),

    managerName: z
      .string({
        invalid_type_error: 'O campo Nome do Responsável ("managerName") deve ser uma string.',
        required_error: 'O campo Nome do Responsável ("managerName") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome do Responsável ("managerName") deve ter pelo menos 3 caracteres.'
      }),

    managerPhoneNumber: z
      .string({
        invalid_type_error: 'O campo Telefone do Responsável ("managerPhoneNumber") deve ser uma string.',
        required_error: 'O campo Telefone do Responsável ("managerPhoneNumber") é obrigatório.'
      })
      .min(10, {
        message: 'O campo Telefone do Responsável ("managerPhoneNumber") deve ter pelo menos 10 caracteres.'
      })
      .max(11, {
        message: 'O campo Telefone do Responsável ("managerPhoneNumber") deve ter no máximo 11 caracteres.'
      }),

    managerEmail: z
      .string({
        invalid_type_error: 'O campo E-mail do Responsável ("managerEmail") deve ser uma string.',
        required_error: 'O campo E-mail do Responsável ("managerEmail") é obrigatório.'
      })
      .email({
        message: 'O campo E-mail do Responsável ("managerEmail") deve ser um e-mail válido.'
      }),

    financePhoneNumber: z
      .string({
        invalid_type_error: 'O campo Telefone do Financeiro ("financePhoneNumber") deve ser uma string.',
        required_error: 'O campo Telefone do Financeiro ("financePhoneNumber") é obrigatório.'
      })
      .min(10, {
        message: 'O campo Telefone do Responsável ("financePhoneNumber") deve ter pelo menos 10 caracteres.'
      })
      .max(11, {
        message: 'O campo Telefone do Responsável ("financePhoneNumber") deve ter no máximo 11 caracteres.'
      }),

    lumpSum: z
      .number({
        invalid_type_error: 'O campo Valor Fixo ("lumpSum") deve ser um number.',
        required_error: 'O campo Valor Fixo ("lumpSum") é obrigatório.'
      })
      .gte(0, {
        message: 'O campo Valor Fixo ("lumpSum") deve ser maior ou igual a 0.'
      })
      .optional(),

    unitValue: z
      .number({
        invalid_type_error: 'O campo Valor Unitário ("unitValue") deve ser um number.',
        required_error: 'O campo Valor Unitário ("unitValue") é obrigatório.'
      })
      .gte(0, {
        message: 'O campo Valor Unitário ("unitValue") deve ser maior ou igual a 0.'
      })
      .optional(),

    contractUrl: z
      .string({
        invalid_type_error: 'O campo URL do Contrato ("contractUrl") deve ser uma string.',
        required_error: 'O campo URL do Contrato ("contractUrl") é obrigatório.'
      })
      .url({
        message: 'O campo URL do Contrato ("contractUrl") deve ser uma URL válida.'
      })
      .optional(),

    statusId: z
      .number({
        invalid_type_error: 'O campo Status ("statusId") deve ser um number.',
        required_error: 'O campo Status ("statusId") é obrigatório.'
      })
      .gte(1, {
        message: 'O campo Status ("statusId") deve 1 (ativo), 2 (inativo) ou 3 (excluído).'
      })
      .lte(3, {
        message: 'O campo Status ("statusId") deve 1 (ativo), 2 (inativo) ou 3 (excluído).'
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
