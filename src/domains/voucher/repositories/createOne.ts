import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { Voucher } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'
import type { VoucherToBeCreated } from '../voucherInterfaces'

export async function createOne (data: VoucherToBeCreated): Promise<Voucher['id']> {
  const VOUCHER_ALREADY_EXISTS = 'Voucher já cadastrado.'

  try {
    const { id } = await prismaClient.voucher.create({
      data,
      select: { id: true }
    })

    return id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(VOUCHER_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
