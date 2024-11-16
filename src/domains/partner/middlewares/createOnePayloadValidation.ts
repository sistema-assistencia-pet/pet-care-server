import { type NextFunction, type Request, type Response } from 'express'
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
      .optional(),

    fantasyName: z
      .string({
        invalid_type_error: 'O campo Nome Fantasia ("fantasyName") deve ser uma string.',
        required_error: 'O campo Nome Fantasia ("fantasyName") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome Fantasia ("fantasyName") deve ter pelo menos 3 caracteres.'
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
      .optional(),

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
      })
      .optional(),

    managerName: z
      .string({
        invalid_type_error: 'O campo Nome do Responsável ("managerName") deve ser uma string.',
        required_error: 'O campo Nome do Responsável ("managerName") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome do Responsável ("managerName") deve ter pelo menos 3 caracteres.'
      })
      .optional(),

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
      })
      .optional(),

    managerEmail: z
      .string({
        invalid_type_error: 'O campo E-mail do Responsável ("managerEmail") deve ser uma string.',
        required_error: 'O campo E-mail do Responsável ("managerEmail") é obrigatório.'
      })
      .optional(),

    businessPhoneNumber: z
      .string({
        invalid_type_error: 'O campo Telefone Comercial ("businessPhoneNumber") deve ser uma string.',
        required_error: 'O campo Telefone Comercial ("businessPhoneNumber") é obrigatório.'
      })
      .length(11, {
        message: 'O campo Telefone Comercial ("businessPhoneNumber") deve ter 11 caracteres.'
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
      .optional()
  })

  try {
    createOnePayloadSchema.parse({
      cnpj: req.body.cnpj,
      corporateName: req.body.corporateName,
      fantasyName: req.body.fantasyName,

      cep: req.body.address.cep,
      street: req.body.address.street,
      number: req.body.address.number,
      complement: req.body.address.complement,
      neighborhood: req.body.address.neighborhood,
      cityId: req.body.address.cityId,
      stateId: req.body.address.stateId,

      categoryId: req.body.categoryId,
      tags: req.body.tags,
      isOnline: req.body.isOnline,
      managerName: req.body.managerName,
      managerPhoneNumber: req.body.managerPhoneNumber,
      managerEmail: req.body.managerEmail,
      businessPhoneNumber: req.body.businessPhoneNumber,
      about: req.body.about,
      openingHours: req.body.openingHours
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
