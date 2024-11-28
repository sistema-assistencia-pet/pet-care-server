import type { Client, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError, NotFoundError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function updateOne (
  id: Client['id'],
  data: Prisma.ClientUncheckedUpdateInput
): Promise<Client['id']> {
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'
  const CLIENT_ALREADY_EXISTS = 'Cliente já cadastrado. Campo FIELD_NAME já existe.'
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  try {
    const client = await prismaClient.client.update({
      data,
      where: { id },
      select: { id: true }
    })

    return client.id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(CLIENT_NOT_FOUND)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) throw new BadRequestError(INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? ''))

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_ALREADY_EXISTS.replace('FIELD_NAME', error.meta?.target as string ?? ''))

    throw new DatabaseError(error)
  }
}
