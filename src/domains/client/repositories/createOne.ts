import type { Address, Client, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { ClientToBeCreated } from '../clientInterfaces'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (
  { managerCpf, managerPassword, address, ...clientToBeCreated }: ClientToBeCreated,
  addressId: Address['id'] | null
): Promise<Pick<Client, 'id'>> {
  const CLIENT_ALREADY_EXISTS = 'Cliente (CNPJ) já cadastrado.'

  const data: Prisma.ClientCreateInput = { ...clientToBeCreated }

  if (address !== null && addressId !== null && address.cityId !== null && address.stateId !== null) {
    data.address = { connect: { id: addressId } }
    data.city = { connect: { id: address.cityId } }
    data.state = { connect: { id: address.stateId } }
  }

  try {
    const client = await prismaClient.client.create({
      data,
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
