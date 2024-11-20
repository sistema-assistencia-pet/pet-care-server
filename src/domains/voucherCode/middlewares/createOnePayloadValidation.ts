import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export async function createOnePayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const createOnePayloadSchema = z.object({
    code: z
      .string({
        invalid_type_error: 'O campo Código ("code") deve ser uma string.',
        required_error: 'O campo Código ("code") é obrigatório.'
      }),

    voucherId: z
      .string({
        invalid_type_error: 'O campo Id do Voucher ("voucherId") deve ser uma string.',
        required_error: 'O campo Id do Voucher ("voucherId") é obrigatório.'
      })
      .uuid({
        message: 'O campo Id do Voucher ("voucherId") deve ser um UUID válido.'
      })
  })

  try {
    createOnePayloadSchema.parse({
      code: req.body.code,
      voucherId: req.body.voucherId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
