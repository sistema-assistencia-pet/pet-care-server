import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type Address } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaErrors } from '../../../enums/prismaErrors'
import { type AddressToBeCreated } from '../addressInterfaces'

export async function createOne (addressToBeCreated: AddressToBeCreated): Promise<Pick<Address, 'id'>> {
  try {
    const address = await prismaClient.address.create({
      data: { ...addressToBeCreated },
      select: {
        id: true
      }
    })

    return address
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError('Endereço já cadastrado.')

    throw new DatabaseError(error)
  }
}
