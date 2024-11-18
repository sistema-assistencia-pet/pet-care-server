import type { Client } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { ClientToBeCreated } from '../clientInterfaces'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (clientToBeCreated: ClientToBeCreated): Promise<Pick<Client, 'id'>> {
  const CLIENT_ALREADY_EXISTS = 'CNPJ já cadastrado.'

  try {
    const client = await prismaClient.client.create({
      data: { ...clientToBeCreated },
      select: {
        id: true
      }
    })

    return client
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
