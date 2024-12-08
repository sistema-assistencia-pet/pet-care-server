import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaError } from '../../../enums/prismaError'
import prismaClient from '../../../database/connection'
import type { VoucherSettingsByClientToBeCreated } from '../voucherSettingsByClientInterfaces'

export async function upsertOne (data: VoucherSettingsByClientToBeCreated): Promise<void> {
  const CLIENT_VOUCHER_SETTINGS_ALREADY_EXISTS = 'Configurações de voucher para este cliente já cadastrada.'
  try {
    await prismaClient.voucherSettingsByClient.upsert({
      where: { clientId_voucherId: { clientId: data.clientId, voucherId: data.voucherId } },
      create: data,
      update: { reservedBalanceInCents: { increment: data.reservedBalanceInCents }, waitingTimeInHours: data.waitingTimeInHours }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
