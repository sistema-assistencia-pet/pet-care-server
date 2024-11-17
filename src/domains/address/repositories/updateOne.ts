import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type Address } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaErrors } from '../../../enums/prismaErrors'
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
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError('Endereço já cadastrado.')

    throw new DatabaseError(error)
  }
}
