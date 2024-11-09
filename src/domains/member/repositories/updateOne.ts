import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { Member } from '@prisma/client'

import { DatabaseError, NotFoundError } from '../../../errors'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function updateOne (id: string, data: Partial<Member>): Promise<void> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  try {
    await prismaClient.member.update({
      data,
      where: { id }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new NotFoundError(MEMBER_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
