import type { ClientRecharge } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { ClientRechargeToBeCreated } from '../clientRechargeInterfaces'
import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (data: ClientRechargeToBeCreated): Promise<ClientRecharge['id']> {
  const CLIENT_BALANCE_RECHARGE_ALREADY_EXISTS = 'Recarga de saldo do cliente já cadastrada.'

  try {
    const { id } = await prismaClient.clientRecharge.create({ data, select: { id: true } })

    return id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_BALANCE_RECHARGE_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
