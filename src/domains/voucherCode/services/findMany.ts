import type { Prisma, VoucherCode } from '@prisma/client'

import type { FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import { voucherCodeRepositories } from '../repositories/voucherCodeRepositories'
import type { FindManyVoucherCodesQueryParams } from '../voucherCodeInterfaces'

export async function findMany (queryParams: FindManyVoucherCodesQueryParams): Promise<FindManyResponse<VoucherCode>> {
  const VOUCHER_CODES_NOT_FOUND = 'Nenhum Código de Voucher encontrado.'

  const where: Prisma.VoucherCodeWhereInput = { voucherId: queryParams.voucherId }

  if ('wasRedeemed' in queryParams) where.wasRedeemed = queryParams.wasRedeemed

  const voucherCodes = await voucherCodeRepositories.findMany(where)

  if (voucherCodes.length === 0) throw new NotFoundError(VOUCHER_CODES_NOT_FOUND)

  return { items: voucherCodes, totalCount: voucherCodes.length }
}
