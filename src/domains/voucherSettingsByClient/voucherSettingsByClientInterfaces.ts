import type { VoucherSettingsByClient } from '@prisma/client'

export type VoucherSettingsByClientToBeCreated = Omit<VoucherSettingsByClient, 'createdAt' | 'updatedAt'>
