import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'
import { cityRepositories } from '../../city/repositories/cityRepositories'

export async function updateOnePayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const updateOnePayloadSchema = z.object({
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
      .optional()
  })

  try {
    updateOnePayloadSchema.parse({
      cnpj: req.body.cnpj,
      corporateName: req.body.corporateName,
      fantasyName: req.body.fantasyName,
      segment: req.body.segment,

      managerName: req.body.managerName,
      managerPhoneNumber: req.body.managerPhoneNumber,
      managerEmail: req.body.managerEmail,
      financePhoneNumber: req.body.financePhoneNumber,
      lumpSum: req.body.lumpSum,
      unitValue: req.body.unitValue,
      contractUrl: req.body.contractUrl
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (req.body.address) {
    const updateAddressPayloadSchema = z.object({
      id: z
        .number({
          invalid_type_error: 'O campo Id ("id") deve ser um number.',
          required_error: 'O campo Id ("id") é obrigatório.'
        })
        .optional(),

      cep: z
        .string({
          invalid_type_error: 'O campo CEP ("cep") deve ser uma string.',
          required_error: 'O campo CEP ("cep") é obrigatório.'
        })
        .length(8, {
          message: 'O campo CEP ("cep") deve ter 14 caracteres.'
        })
        .optional(),

      street: z
        .string({
          invalid_type_error: 'O campo Rua ("street") deve ser uma string.',
          required_error: 'O campo Rua ("street") é obrigatório.'
        })
        .min(3, {
          message: 'O campo Rua ("street") deve ter pelo menos 3 caracteres.'
        })
        .optional(),

      number: z
        .string({
          invalid_type_error: 'O campo Número ("number") deve ser uma string.',
          required_error: 'O campo Número ("number") é obrigatório.'
        })
        .optional(),

      complement: z
        .string({
          invalid_type_error: 'O campo Complemento ("complement") deve ser uma string.',
          required_error: 'O campo Complemento ("complement") é obrigatório.'
        })
        .optional(),

      neighborhood: z
        .string({
          invalid_type_error: 'O campo Bairro ("neighborhood") deve ser uma string.',
          required_error: 'O campo Bairro ("neighborhood") é obrigatório.'
        })
        .optional(),

      cityId: z
        .number({
          invalid_type_error: 'O campo Cidade ("cityId") deve ser um number.',
          required_error: 'O campo Cidade ("cityId") é obrigatório.'
        })
        .optional(),

      stateId: z
        .number({
          invalid_type_error: 'O campo Estado ("stateId") deve ser um number.',
          required_error: 'O campo Estado ("stateId") é obrigatório.'
        })
        .optional()
    })

    try {
      updateAddressPayloadSchema.parse({
        id: req.body.address.id,
        cep: req.body.address.cep,
        street: req.body.address.street,
        number: req.body.address.number,
        complement: req.body.address.complement,
        neighborhood: req.body.address.neighborhood,
        cityId: req.body.address.cityId,
        stateId: req.body.address.stateId
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
      }

      throw new GenericError(error)
    }

    const cities = await cityRepositories.findMany({ id: req.body.address.cityId })

    if (cities.length === 0) {
      throw new BadRequestError('Cidade não encontrada.')
    }

    if (cities[0].stateId !== req.body.address.stateId) {
      throw new BadRequestError('Cidade não pertence ao estado informado.')
    }
  }

  next()
}
