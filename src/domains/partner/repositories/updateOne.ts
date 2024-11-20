import type { Partner } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError, NotFoundError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function updateOne (
  id: Partner['id'],
  data: Partial<Partner>
): Promise<Partner['id']> {
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'
  const PARTNER_ALREADY_EXISTS = 'Estabelecimento já cadastrado. Campo FIELD_NAME já existe.'
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  try {
    const partner = await prismaClient.partner.update({
      data,
      where: { id },
      select: { id: true }
    })

    return partner.id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(PARTNER_NOT_FOUND)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) throw new BadRequestError(INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? ''))

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(PARTNER_ALREADY_EXISTS.replace('FIELD_NAME', error.meta?.target as string ?? ''))

    throw new DatabaseError(error)
  }
}
