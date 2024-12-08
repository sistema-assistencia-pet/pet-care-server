import type { VoucherRedemption } from '@prisma/client'

export type VoucherRedemptionToBeCreated = Omit<VoucherRedemption, 'id' | 'createdAt' | 'updatedAt'>
