import type { ClientRecharge } from '@prisma/client'

export type ClientRechargeToBeCreated = Pick<ClientRecharge, 'clientId' | 'amountInCents'>
