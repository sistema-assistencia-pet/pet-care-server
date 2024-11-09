import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'

export async function upsertOneResetPasswordCode (memberId: string, resetCode: string): Promise<void> {
  try {
    await prismaClient.memberResetPasswordCode.upsert({
      create: { memberId, resetCode },
      update: { resetCode },
      where: { memberId }
    })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
