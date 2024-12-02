import type { Prisma, VoucherSettingsByClient } from '@prisma/client'

export type VoucherSettingsByClientToBeCreated = Omit<VoucherSettingsByClient, 'createdAt' | 'updatedAt'>

export type VoucherSettingsByClientToBeUpdated = Pick<Prisma.VoucherSettingsByClientUncheckedUpdateInput, 'reservedBalanceInCents' | 'watingTimeInDays'>
