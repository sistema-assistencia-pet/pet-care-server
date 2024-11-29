import type { ClientBalanceTransaction } from '@prisma/client'

export type ClientRechargeToBeCreated = Pick<ClientBalanceTransaction, 'clientId' | 'amountInCents' | 'type'>
