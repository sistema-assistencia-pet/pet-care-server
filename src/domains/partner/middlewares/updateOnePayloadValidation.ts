import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function updateOnePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const updateOnePayloadSchema = z.object({
    corporateName: z
      .string({
        invalid_type_error: 'O campo Razão Social ("corporateName") deve ser uma string.',
        required_error: 'O campo Razão Social ("corporateName") é obrigatório.'
      })
      .optional(),

    fantasyName: z
      .string({
        invalid_type_error: 'O campo Nome Fantasia ("fantasyName") deve ser uma string.',
        required_error: 'O campo Nome Fantasia ("fantasyName") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome Fantasia ("fantasyName") deve ter pelo menos 3 caracteres.'
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

    categoryId: z
      .number({
        invalid_type_error: 'O campo Categoria ("categoryId") deve ser um number.',
        required_error: 'O campo Categoria ("categoryId") é obrigatório.'
      }),

    tags: z
      .string({
        invalid_type_error: 'O campo Tags ("tags") deve ser uma string.',
        required_error: 'O campo Tags ("tags") é obrigatório.'
      })
      .optional(),

    isOnline: z
      .boolean({
        invalid_type_error: 'O campo Online ("isOnline") deve ser uma string.',
        required_error: 'O campo Online ("isOnline") é obrigatório.'
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
      // .email({
      //   message: 'O campo E-mail do Responsável ("managerEmail") deve ser um e-mail válido.'
      // })
      .optional(),

    businessPhoneNumber: z
      .string({
        invalid_type_error: 'O campo Telefone Comercial ("businessPhoneNumber") deve ser uma string.',
        required_error: 'O campo Telefone Comercial ("businessPhoneNumber") é obrigatório.'
      })
      .min(10, {
        message: 'O campo Telefone do Responsável ("businessPhoneNumber") deve ter pelo menos 10 caracteres.'
      })
      .max(11, {
        message: 'O campo Telefone do Responsável ("businessPhoneNumber") deve ter no máximo 11 caracteres.'
      })
      .optional(),

    about: z
      .string({
        invalid_type_error: 'O campo Sobre ("about") deve ser uma string.',
        required_error: 'O campo Sobre ("about") é obrigatório.'
      })
      .optional(),

    openingHours: z
      .string({
        invalid_type_error: 'O campo Horário de Funcionamento ("openingHours") deve ser uma string.',
        required_error: 'O campo Horário de Funcionamento ("openingHours") é obrigatório.'
      })
      .optional(),

    instagram: z
      .string({
        invalid_type_error: 'O campo Instagram ("instagram") deve ser uma string.',
        required_error: 'O campo Instagram ("instagram") é obrigatório.'
      })
      .optional(),

    webpage: z
      .string({
        invalid_type_error: 'O campo Site Oficial ("webpage") deve ser uma string.',
        required_error: 'O campo Site Oficial ("webpage") é obrigatório.'
      })
      // .url({
      //   message: 'O campo Site Oficial ("webpage") deve ser uma URL válida.'
      // })
      .optional(),

    contractUrl: z
      .string({
        invalid_type_error: 'O campo URL do Contrato ("contractUrl") deve ser uma string.',
        required_error: 'O campo URL do Contrato ("contractUrl") é obrigatório.'
      })
      // .url({
      //   message: 'O campo URL do Contrato ("contractUrl") deve ser uma URL válida.'
      // })
      .optional(),

    benefit1Title: z
      .string({
        invalid_type_error: 'O campo Título do Benefício 1 ("benefit1Title") deve ser uma string.',
        required_error: 'O campo Título do Benefício 1 ("benefit1Title") é obrigatório.'
      })
      .optional(),

    benefit1Description: z
      .string({
        invalid_type_error: 'O campo Descrição do Benefício 1 ("benefit1Description") deve ser uma string.',
        required_error: 'O campo Descrição do Benefício 1 ("benefit1Description") é obrigatório.'
      })
      .optional(),

    benefit1Rules: z
      .string({
        invalid_type_error: 'O campo Regras do Benefício 1 ("benefit1Rules") deve ser uma string.',
        required_error: 'O campo Regras do Benefício 1 ("benefit1Rules") é obrigatório.'
      })
      .optional(),

    benefit1Link: z
      .string({
        invalid_type_error: 'O campo Link do Benefício 1 ("benefit1Link") deve ser uma string.',
        required_error: 'O campo Link do Benefício 1 ("benefit1Link") é obrigatório.'
      })
      .optional(),

    benefit1Voucher: z
      .string({
        invalid_type_error: 'O campo Voucher do Benefício 1 ("benefit1Voucher") deve ser uma string.',
        required_error: 'O campo Voucher do Benefício 1 ("benefit1Voucher") é obrigatório.'
      })
      .optional(),

      benefit2Title: z
      .string({
        invalid_type_error: 'O campo Título do Benefício 2 ("benefit2Title") deve ser uma string.',
        required_error: 'O campo Título do Benefício 2 ("benefit2Title") é obrigatório.'
      })
      .optional(),

    benefit2Description: z
      .string({
        invalid_type_error: 'O campo Descrição do Benefício 2 ("benefit2Description") deve ser uma string.',
        required_error: 'O campo Descrição do Benefício 2 ("benefit2Description") é obrigatório.'
      })
      .optional(),

    benefit2Rules: z
      .string({
        invalid_type_error: 'O campo Regras do Benefício 2 ("benefit2Rules") deve ser uma string.',
        required_error: 'O campo Regras do Benefício 2 ("benefit2Rules") é obrigatório.'
      })
      .optional(),

    benefit2Link: z
      .string({
        invalid_type_error: 'O campo Link do Benefício 2 ("benefit2Link") deve ser uma string.',
        required_error: 'O campo Link do Benefício 2 ("benefit2Link") é obrigatório.'
      })
      .optional(),

    benefit2Voucher: z
      .string({
        invalid_type_error: 'O campo Voucher do Benefício 2 ("benefit2Voucher") deve ser uma string.',
        required_error: 'O campo Voucher do Benefício 2 ("benefit2Voucher") é obrigatório.'
      })
      .optional()
  })

  try {
    updateOnePayloadSchema.parse({
      corporateName: req.body.corporateName,
      fantasyName: req.body.fantasyName,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      categoryId: req.body.categoryId,
      tags: req.body.tags,
      isOnline: req.body.isOnline,
      managerName: req.body.managerName,
      managerPhoneNumber: req.body.managerPhoneNumber,
      managerEmail: req.body.managerEmail,
      businessPhoneNumber: req.body.businessPhoneNumber,
      about: req.body.about,
      openingHours: req.body.openingHours,
      instagram: req.body.instagram,
      webpage: req.body.webpage,
      contractUrl: req.body.contractUrl,
      benefit1Title: req.body.benefit1Title,
      benefit1Description: req.body.benefit1Description,
      benefit1Rules: req.body.benefit1Rules,
      benefit1Link: req.body.benefit1Link,
      benefit1Voucher: req.body.benefit1Voucher,
      benefit2Title: req.body.benefit2Title,
      benefit2Description: req.body.benefit2Description,
      benefit2Rules: req.body.benefit2Rules,
      benefit2Link: req.body.benefit2Link,
      benefit2Voucher: req.body.benefit2Voucher
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
