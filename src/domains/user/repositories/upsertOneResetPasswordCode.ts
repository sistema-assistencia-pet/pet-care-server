import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'

export async function upsertOneResetPasswordCode (userId: string, resetCode: string): Promise<void> {
  try {
    await prismaClient.userResetPasswordCode.upsert({
      create: { userId, resetCode },
      update: { resetCode },
      where: { userId }
    })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
