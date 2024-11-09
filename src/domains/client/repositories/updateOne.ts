import type { Client } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { DatabaseError, NotFoundError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function updateOne (id: string, data: Partial<Client>): Promise<void> {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  try {
    await prismaClient.client.update({
      data,
      where: { id }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new NotFoundError(CLIENT_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
