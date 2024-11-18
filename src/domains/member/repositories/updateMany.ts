import prismaClient from '../../../database/connection'
import type { Member, Prisma } from '@prisma/client'

import { DatabaseError, NotFoundError } from '../../../errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prismaError } from '../../../enums/prismaError'

export async function updateMany (
  data: Partial<Member>,
  where: Prisma.MemberWhereInput
): Promise<void> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  try {
    await prismaClient.member.updateMany({
      data,
      where
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(`${MEMBER_NOT_FOUND}${('id' in data) ? ' (id: ' + data.id + ')' : ''}`)

    throw new DatabaseError(error)
  }
}
