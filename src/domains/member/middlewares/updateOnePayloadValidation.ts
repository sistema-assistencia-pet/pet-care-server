import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function updateOnePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const updateOnePayloadSchema = z.object({
    birthDate: z
      .string({
        invalid_type_error: 'O campo Data de Nascimento ("birthDate") deve ser uma string no formato AAAA-MM-DD.',
        required_error: 'O campo Data de Nascimento ("birthDate") é obrigatório e deve estar no formato AAAA-MM-DD.'
      })
      .optional(),

    cep: z
      .string({
        invalid_type_error: 'O campo CEP ("cep") deve ser uma string.',
        required_error: 'O campo CEP ("cep") é obrigatório.'
      })
      .length(8, {
        message: 'O campo CEP ("cep") deve ter 8 caracteres.'
      })
      .optional(),

    email: z
      .string({
        invalid_type_error: 'O campo E-mail ("email") deve ser uma string.',
        required_error: 'O campo E-mail ("email") é obrigatório.'
      })
      .email({
        message: 'O campo E-mail ("email") deve ser um e-mail válido.'
      })
      .optional(),

    name: z
      .string({
        invalid_type_error: 'O campo Nome ("name") deve ser uma string.',
        required_error: 'O campo Nome ("name") é obrigatório.'
      })
      .min(3, {
        message: 'O campo Nome ("name") deve ter pelo menos 3 caracteres.'
      })
      .optional(),

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
      .optional()
  })

  try {
    updateOnePayloadSchema.parse({
      birthDate: req.body.birthDate,
      cep: req.body.cep,
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  if (req.body.birthDate) {
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
  }

  next()
}
