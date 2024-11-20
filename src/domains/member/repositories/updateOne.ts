import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { Member } from '@prisma/client'

import { BadRequestError, DatabaseError, NotFoundError } from '../../../errors'
import { prismaError } from '../../../enums/prismaError'

export async function updateOne (
  id: Member['id'],
  data: Partial<Member>
): Promise<Member['id']> {
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'
  const MEMBER_ALREADY_EXISTS = 'Associado já cadastrado. Campo FIELD_NAME já existe.'
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  try {
    const member = await prismaClient.member.update({
      data,
      where: { id },
      select: { id: true }
    })

    return member.id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(MEMBER_NOT_FOUND)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) throw new BadRequestError(INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? ''))

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(MEMBER_ALREADY_EXISTS.replace('FIELD_NAME', error.meta?.target as string ?? ''))

    throw new DatabaseError(error)
  }
}
