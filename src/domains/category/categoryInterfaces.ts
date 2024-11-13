import type { Category } from '@prisma/client'

export type CategoryToBeReturned = Omit<Category, 'createdAt' | 'updatedAt'>

export type CategoryToBeCreated = Pick<Category, 'name'>
