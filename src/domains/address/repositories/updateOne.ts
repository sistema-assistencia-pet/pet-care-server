import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type Address } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaError } from '../../../enums/prismaError'
import { type AddressToBeUpdated } from '../addressInterfaces'

export async function updateOne (addressId: Address['id'], addressToBeUpdated: AddressToBeUpdated): Promise<Pick<Address, 'id'>> {
  try {
    const address = await prismaClient.address.update({
      where: { id: addressId },
      data: { ...addressToBeUpdated },
      select: {
        id: true
      }
    })

    return address
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError('Endereço já cadastrado.')

    throw new DatabaseError(error)
  }
}
