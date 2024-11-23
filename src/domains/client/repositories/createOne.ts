import type { Address, Client } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { ClientToBeCreated } from '../clientInterfaces'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (
  { address, ...clientToBeCreated }: ClientToBeCreated,
  addressId: Address['id'] | null
): Promise<Pick<Client, 'id'>> {
  const CLIENT_ALREADY_EXISTS = 'Cliente (CNPJ) já cadastrado.'

  try {
    const client = await prismaClient.client.create({
      data: {
        addressId,
        cityId: address === null ? null : address.cityId,
        stateId: address === null ? null : address.stateId,
        ...clientToBeCreated
      },
      select: { id: true }
    })

    return client
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
