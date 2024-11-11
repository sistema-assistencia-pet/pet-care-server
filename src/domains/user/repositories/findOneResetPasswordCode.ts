import prismaClient from '../../../database/connection'
import type { UserResetPasswordCode } from '@prisma/client'

import { DatabaseError } from '../../../errors'

export async function findOneResetPasswordCode (userId: string): Promise<UserResetPasswordCode | null> {
  try {
    const resetPasswordCodeData = await prismaClient.userResetPasswordCode.findUnique({
      where: { userId }
    })

    return resetPasswordCodeData
  } catch (error) {
    throw new DatabaseError(error)
  }
}
