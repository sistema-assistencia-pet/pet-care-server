import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'
import type { VoucherRedemptionToBeCreated } from '../voucherRedemptionInterfaces'

export async function createOne (data: VoucherRedemptionToBeCreated): Promise<void> {
  const VOUCHER_REDEMPTION_ALREADY_SAVED = 'Registro de uso do voucher já existe.'

  try {
    await prismaClient.voucherRedemption.create({
      data
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(VOUCHER_REDEMPTION_ALREADY_SAVED)

    throw new DatabaseError(error)
  }
}
