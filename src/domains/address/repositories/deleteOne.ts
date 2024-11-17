import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type Address } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function deleteOne (addressId: Address['id']): Promise<Address['id']> {
  try {
    const { id } = await prismaClient.address.delete({
      where: { id: addressId },
      select: {
        id: true
      }
    })

    return id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError('Endereço já cadastrado.')

    throw new DatabaseError(error)
  }
}
