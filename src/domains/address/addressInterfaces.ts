import type { Address } from '@prisma/client'

export type AddressToBeCreated = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
