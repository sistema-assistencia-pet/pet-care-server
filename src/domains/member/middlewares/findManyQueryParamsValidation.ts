import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function findManyQueryParamsValidation (req: Request, _res: Response, next: NextFunction): void {
  const findManyQueryParamsSchema = z.object({
    searchInput: z
      .string({
        invalid_type_error: 'O campo Busca ("searchInput") deve ser uma string.',
        required_error: 'O campo Busca ("searchInput") é obrigatório.'
      })
      .optional(),

    take: z
      .number({
        invalid_type_error: 'O campo Quantidade de Registros ("take") deve ser um number.',
        required_error: 'O campo Quantidade de Registros ("take") é obrigatório.'
      })
      .gte(1, {
        message: 'O campo Quantidade de Registros ("take") deve ser maior que 0.'
      })
      .lte(50, {
        message: 'O campo Quantidade de Registros ("take") deve ser menor ou igual a 50.'
      })
      .optional(),

    skip: z
      .number({
        invalid_type_error: 'O campo Pular Registros ("skip") deve ser um number.',
        required_error: 'O campo Pular Registros ("skip") é obrigatório.'
      })
      .gte(0, {
        message: 'O campo Pular Registros ("skip") deve ser maior ou igual a 0.'
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
      .optional()
  })

  try {
    findManyQueryParamsSchema.parse({
      searchInput: req.query['search-input'],
      take: typeof req.query.take === 'string' ? parseInt(req.query.take) : undefined,
      skip: typeof req.query.skip === 'string' ? parseInt(req.query.skip) : undefined,
      statusId: typeof req.query['status-id'] === 'string' ? parseInt(req.query['status-id']) : undefined
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
