import type { VoucherCode, VoucherRedemption } from '@prisma/client'

export type VoucherRedemptionToBeCreated = Omit<VoucherRedemption, 'id' | 'createdAt' | 'updatedAt' | 'wasValidated' | 'validatedAt'>

export type VoucherRedemptionToBeReturned = VoucherRedemption & { voucherCode: VoucherCode }
