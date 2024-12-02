import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { Client, Voucher } from '@prisma/client'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'
import type { VoucherSettingsByClientToBeUpdated } from '../voucherSettingsByClientInterfaces'

export async function updateOne (
  clientId: Client['id'],
  voucherId: Voucher['id'],
  data: VoucherSettingsByClientToBeUpdated
): Promise<void> {
  const CLIENT_VOUCHER_SETTINGS_ALREADY_EXISTS = 'Configurações de voucher para este cliente já cadastrada.'
  try {
    await prismaClient.voucherSettingsByClient.update({
      where: { clientId_voucherId: { clientId, voucherId } },
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
