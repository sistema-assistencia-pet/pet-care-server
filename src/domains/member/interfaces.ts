import { Member } from '@prisma/client'

export type MemberToBeCreated = Omit<Member, 'id' | 'password' | 'createdPassword' | 'totalSavings' | 'createdAt' | 'updatedAt'>

export type MemberToBeReturned = Omit<Member, 'password' | 'createdPassword' | 'updatedAt'>
