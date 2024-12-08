import type { Member, Voucher, VoucherCode } from '@prisma/client'

export type VoucherCodeToBeCreated = Pick<VoucherCode, 'code' | 'voucherId'>

export interface FindManyVoucherCodesQueryParams {
  voucherId: Voucher['id']
  wasRedeemed?: VoucherCode['wasRedeemed']
}

export interface ValidateVoucherCodeData {
  code: VoucherCode['code']
  memberCpf: Member['cpf']
}
