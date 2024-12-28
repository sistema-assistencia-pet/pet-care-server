import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'
import { cityRepositories } from '../../city/repositories/cityRepositories'

export async function createOnePayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const createOnePayloadSchema = z.object({
    birthDate: z
      .string({
        invalid_type_error: 'O campo Data de Nascimento ("birthDate") deve ser uma string no formato AAAA-MM-DD.',
        required_error: 'O campo Data de Nascimento ("birthDate") é obrigatório e deve estar no formato AAAA-MM-DD.'
      })
      .optional(),

    clientId: z
      .string({
        invalid_type_error: 'O campo ID do Cliente ("clientId") deve ser uma string.',
        required_error: 'O campo ID do Cliente ("clientId") é obrigatório.'
      })
      .uuid({
        message: 'O campo ID do Cliente ("clientId") deve ser um UUID válido.'
      }),

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

    phoneNumber: z
      .string({
        invalid_type_error: 'O campo Telefone ("phoneNumber") deve ser uma string.',
        required_error: 'O campo Telefone ("phoneNumber") é obrigatório.'
      })
      .min(10, {
        message: 'O campo Telefone do Responsável ("phoneNumber") deve ter pelo menos 10 caracteres.'
      })
      .max(11, {
        message: 'O campo Telefone do Responsável ("phoneNumber") deve ter no máximo 11 caracteres.'
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
    createOnePayloadSchema.parse({
      birthDate: req.body.birthDate,
      clientId: req.body.clientId,
      cpf: req.body.cpf,
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,

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

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (req.body.birthDate) {
    const birthDateSplitted: string[] = req.body.birthDate.split('-')

    if (
      (birthDateSplitted.length !== 3) ||
      (birthDateSplitted[0].length !== 4) ||
      (birthDateSplitted[1].length !== 2) ||
      (birthDateSplitted[2].length !== 2) ||
      (birthDateSplitted.every((substring: any) => isNaN(Number(substring))))
    ) {
      throw new BadRequestError('"birthDate" deve estar no formato AAAA-MM-DD.')
    }
  }

  const cities = await cityRepositories.findMany({ where: { id: req.body.address.cityId } })

  if (cities.length === 0) {
    throw new BadRequestError('Cidade não encontrada.')
  }

  if (cities[0].stateId !== req.body.address.stateId) {
    throw new BadRequestError('Cidade não pertence ao estado informado.')
  }

  next()
}
