import prismaClient from '../../../database/connection'
import type { MemberResetPasswordCode } from '@prisma/client'

import { DatabaseError } from '../../../errors'

export async function findOneResetPasswordCode (memberId: string): Promise<MemberResetPasswordCode | null> {
  try {
    const resetPasswordCodeData = await prismaClient.memberResetPasswordCode.findUnique({
      where: { memberId }
    })

    return resetPasswordCodeData
  } catch (error) {
    throw new DatabaseError(error)
  }
}
