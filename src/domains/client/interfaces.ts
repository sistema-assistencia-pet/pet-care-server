import { Client } from '@prisma/client'

export type ClientToBeCreated = Omit<Client, 'id' | 'totalSavings' | 'createdAt' | 'updatedAt'>