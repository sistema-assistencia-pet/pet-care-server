import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export async function configureVoucherPayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const configureVoucherPayloadSchema = z.object({
    voucherId: z
      .string({
        invalid_type_error: 'O campo Id do Voucher ("voucherId") deve ser uma string.',
        required_error: 'O campo Id do Voucher ("voucherId") é obrigatório.'
      })
      .uuid({
        message: 'O campo Id do Voucher ("voucherId") deve ser um UUID válido.'
      }),

    rechargeAmountInCents: z
      .number({
        invalid_type_error: 'O campo Valor da Recarga em Centavos ("rechargeAmountInCents") deve ser um number.',
        required_error: 'O campo Valor da Recarga em Centavos ("rechargeAmountInCents") é obrigatório.'
      }),

    watingTimeInDays: z
      .number({
        invalid_type_error: 'O campo Tempo de Espera em Dias ("watingTimeInDays") deve ser um number.',
        required_error: 'O campo Tempo de Espera em Dias ("watingTimeInDays") é obrigatório.'
      })
      .gte(0, {
        message: 'O campo Tempo de Espera em Dias ("watingTimeInDays") deve ser maior ou igual a 0.'
      })
      .optional()
  })

  try {
    configureVoucherPayloadSchema.parse({
      voucherId: req.body.voucherId,
      rechargeAmountInCents: req.body.rechargeAmountInCents,
      watingTimeInDays: req.body.watingTimeInDays
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  if (req.body.rechargeAmountInCents === 0) {
    throw new BadRequestError('O campo Valor da Recarga em Centavos ("rechargeAmountInCents") deve ser diferente de 0.')
  }

  next()
}
