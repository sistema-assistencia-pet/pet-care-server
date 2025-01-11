import prismaClient from '../../../database/connection'
import type { Prisma, Voucher } from '@prisma/client'

import { DatabaseError, NotFoundError } from '../../../errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prismaError } from '../../../enums/prismaError'

export async function updateMany (
  data: Partial<Voucher>,
  where: Prisma.VoucherWhereInput
): Promise<void> {
  const VOUCHER_NOT_FOUND = 'Voucher não encontrado.'

  try {
    await prismaClient.voucher.updateMany({
      data,
      where
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(`${VOUCHER_NOT_FOUND}${('id' in data) ? ' (id: ' + data.id + ')' : ''}`)

    throw new DatabaseError(error)
  }
}
