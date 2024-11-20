import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { VoucherCode } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'
import type { VoucherCodeToBeCreated } from '../voucherCodeInterfaces'

export async function createOne (data: VoucherCodeToBeCreated): Promise<VoucherCode['id']> {
  const VOUCHER_CODE_ALREADY_EXISTS = 'Código de voucher já cadastrado.'

  try {
    const { id } = await prismaClient.voucherCode.create({
      data,
      select: { id: true }
    })

    return id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(VOUCHER_CODE_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
