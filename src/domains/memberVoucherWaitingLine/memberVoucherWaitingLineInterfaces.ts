import type { MemberVoucherWaitingLine } from '@prisma/client'

export type MemberVoucherWaitingLineToBeCreated = Omit<MemberVoucherWaitingLine, 'createdAt' | 'updatedAt'>
