import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import prismaClient from '../../../database/connection'

import { DatabaseError, NotFoundError } from '../../../errors'
import { prismaError } from '../../../enums/prismaError'

export async function deleteOneResetPasswordCode (memberId: string): Promise<void> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  try {
    await prismaClient.memberResetPasswordCode.delete({
      where: { memberId }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(MEMBER_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
