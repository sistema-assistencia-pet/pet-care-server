import { type Item, type Order } from '@prisma/client'

export type ItemToBeCreated = Omit<Item, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>

export type OrderToBeCreated = Omit<Order, 'id' | 'createdAt' | 'updatedAt'> & { items: ItemToBeCreated[] }
