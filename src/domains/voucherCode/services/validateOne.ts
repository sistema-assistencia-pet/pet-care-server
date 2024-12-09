import type { Prisma } from '@prisma/client'

import type { AccessTokenData } from '../../../interfaces'
import { BadRequestError } from '../../../errors'
import type { ValidateVoucherCodeData } from '../voucherCodeInterfaces'
import { voucherRedemptionRepositories } from '../../voucherRedemption/repositories/voucherRedemptionRepositories'
import { voucherCodeRepositories } from '../repositories/voucherCodeRepositories'

export async function validateOne (accessTokenData: AccessTokenData, validateVoucherCodeData: ValidateVoucherCodeData): Promise<void> {
  const VOUCHER_CODE_ALREADY_VALIDATED = 'O código de voucher já foi validado anteriormente. O associado deve resgatar um novo código.'
  const VOUCHER_CODE_NOT_REDEEMED_BY_MEMBER = 'Código de voucher não foi resgatado pelo associado.'

  // Verifica se o código de voucher foi devidamente resgatado pelo associado e se já não foi validado anteriormente
  const voucherRedemptionWhere: Prisma.VoucherRedemptionWhereInput = {
    voucherCode: { code: validateVoucherCodeData.code },
    member: { cpf: validateVoucherCodeData.memberCpf }
  }
  const voucherRedemption = await voucherRedemptionRepositories.findFirst(voucherRedemptionWhere)
  if (voucherRedemption === null) throw new BadRequestError(VOUCHER_CODE_NOT_REDEEMED_BY_MEMBER)
  if (voucherRedemption.wasValidated) throw new BadRequestError(VOUCHER_CODE_ALREADY_VALIDATED)

  // Salva a validação do voucher
  await voucherCodeRepositories.updateOne(voucherRedemption.voucherCodeId, { wasValidated: true })
  await voucherRedemptionRepositories.updateOne(
    voucherRedemption.id,
    {
      wasValidated: true,
      validatedAt: new Date()
    }
  )
}
