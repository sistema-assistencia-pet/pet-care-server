import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

import { BadRequestError, GenericError } from '../../../errors'

export async function rechargeBalancePayloadValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const rechargeBalancePayloadSchema = z.object({
    rechargeAmountInCents: z
      .number({
        invalid_type_error: 'O campo Valor da Recarga em Centavos ("rechargeAmountInCents") deve ser um number.',
        required_error: 'O campo Valor da Recarga em Centavos ("rechargeAmountInCents") é obrigatório.'
      })
      .gt(0, {
        message: 'O campo Valor da Recarga em Centavos ("rechargeAmountInCents") deve ser maior que 0.'
      }),

    balanceDistributionSetting: z
      .number({
        invalid_type_error: 'O campo Configuração de Distribuição do Saldo ("balanceDistributionSetting") deve ser um number.',
        required_error: 'O campo Configuração de Distribuição do Saldo ("balanceDistributionSetting") é obrigatório.'
      })
      .gte(1, {
        message: 'O campo Configuração de Distribuição do Saldo ("balanceDistributionSetting") deve ser 1, 2 ou 3.'
      })
      .lte(3, {
        message: 'O campo Configuração de Distribuição do Saldo ("balanceDistributionSetting") deve ser 1, 2 ou 3.'
      }),

    waitingTimeInDays: z
      .number({
        invalid_type_error: 'O campo Tempo de Espera em Dias ("waitingTimeInDays") deve ser um number.',
        required_error: 'O campo Tempo de Espera em Dias ("waitingTimeInDays") é obrigatório.'
      })
      .gte(0, {
        message: 'O campo Tempo de Espera em Dias ("waitingTimeInDays") deve ser maior ou igual a 0.'
      })
      .optional()

  })

  try {
    rechargeBalancePayloadSchema.parse({
      rechargeAmountInCents: req.body.rechargeAmountInCents,
      balanceDistributionSetting: req.body.balanceDistributionSetting,
      waitingTimeInDays: req.body.waitingTimeInDays
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}
