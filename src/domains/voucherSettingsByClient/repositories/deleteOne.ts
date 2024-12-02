import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { Client, Voucher } from '@prisma/client'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function deleteOne (clientId: Client['id'], voucherId: Voucher['id']): Promise<void> {
  const CLIENT_VOUCHER_SETTINGS_NOT_FOUND = 'Configurações do voucher para este cliente não encontrada.'
  try {
    await prismaClient.voucherSettingsByClient.delete({
      where: {
        clientId_voucherId: {
          clientId,
          voucherId
        }
      }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
