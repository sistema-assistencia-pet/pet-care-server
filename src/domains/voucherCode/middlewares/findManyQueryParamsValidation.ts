import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export function findManyQueryParamsValidation (req: Request, _res: Response, next: NextFunction): void {
  const findManyQueryParamsSchema = z.object({
    voucherId: z
      .string({
        invalid_type_error: 'O campo Id do Voucher ("voucherId") deve ser uma string.',
        required_error: 'O campo Id do Voucher ("voucherId") é obrigatório.'
      })
      .uuid({
        message: 'O campo Id do Voucher ("voucherId") deve ser um UUID válido.'
      }),

    wasRedeemed: z
      .boolean({
        invalid_type_error: 'O campo Foi Resgatado ("wasRedeemed") deve ser um boolean.',
        required_error: 'O campo Foi Resgatado ("wasRedeemed") é obrigatório.'
      })
      .optional()
  })

  let wasRedeemed: any
  if (req.query['was-redeemed'] === 'true') wasRedeemed = true
  if (req.query['was-redeemed'] === 'false') wasRedeemed = false

  try {
    findManyQueryParamsSchema.parse({
      voucherId: typeof req.query['voucher-id'] === 'string' ? req.query['voucher-id'] : undefined,
      wasRedeemed
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
