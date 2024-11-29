import type { ClientBalanceTransaction } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { ClientRechargeToBeCreated } from '../clientBalanceTransactionInterfaces'
import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (data: ClientRechargeToBeCreated): Promise<ClientBalanceTransaction['id']> {
  const CLIENT_BALANCE_TRANSACTION_ALREADY_EXISTS = 'Transação de saldo do cliente já cadastrada.'

  try {
    const { id } = await prismaClient.clientBalanceTransaction.create({ data, select: { id: true } })

    return id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_BALANCE_TRANSACTION_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
