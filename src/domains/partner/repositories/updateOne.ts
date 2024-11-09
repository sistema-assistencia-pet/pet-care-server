import type { Partner } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { DatabaseError, NotFoundError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function updateOne (id: string, data: Partial<Partner>): Promise<void> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  try {
    await prismaClient.partner.update({
      data,
      where: { id }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new NotFoundError(PARTNER_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
