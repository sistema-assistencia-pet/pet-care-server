import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaError } from '../../../enums/prismaError'
import prismaClient from '../../../database/connection'
import type { VoucherSettingsByClientToBeCreated } from '../voucherSettingsByClientInterfaces'

export async function createOne (data: VoucherSettingsByClientToBeCreated): Promise<void> {
  const CLIENT_VOUCHER_SETTINGS_ALREADY_EXISTS = 'Configurações de voucher para este cliente já cadastrada.'
  try {
    await prismaClient.voucherSettingsByClient.create({
      data
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
