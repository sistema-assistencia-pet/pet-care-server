import type { Prisma, VoucherSettingsByClient } from '@prisma/client'
import type { VoucherToBeReturnedInFindMany } from '../voucher/voucherInterfaces'

export type VoucherSettingsByClientToBeCreated = Omit<VoucherSettingsByClient, 'createdAt' | 'updatedAt'>

export type VoucherSettingsByClientToBeUpdated = Pick<Prisma.VoucherSettingsByClientUncheckedUpdateInput, 'reservedBalanceInCents' | 'waitingTimeInDays'>

export interface FindManyVoucherSettingsByClientParams {
  skip?: number
  take?: number
  where: Partial<Prisma.VoucherSettingsByClientWhereInput>
}

export type VoucherSettingsByClientToBeReturnedInFindMany = Pick<VoucherSettingsByClient, 'reservedBalanceInCents' | 'waitingTimeInDays'>
& { voucher: Omit<VoucherToBeReturnedInFindMany, 'voucherSettingsByClients'> }
