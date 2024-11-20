import type { VoucherCode } from '@prisma/client'

export type VoucherCodeToBeCreated = Pick<VoucherCode, 'code' | 'voucherId'>

export interface FindManyVoucherCodesQueryParams {
  voucherId: string
  wasRedeemed?: boolean
}
