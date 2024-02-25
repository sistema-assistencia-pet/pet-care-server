import { Order } from '@prisma/client'

export type OrderToBeCreated = Omit<Order, 'id' |'createdAt' | 'updatedAt'>