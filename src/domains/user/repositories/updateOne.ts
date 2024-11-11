import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { User } from '@prisma/client'

import { DatabaseError, NotFoundError } from '../../../errors'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function updateOne (id: string, data: Partial<User>): Promise<void> {
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  try {
    await prismaClient.user.update({
      data,
      where: { id }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new NotFoundError(USER_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
