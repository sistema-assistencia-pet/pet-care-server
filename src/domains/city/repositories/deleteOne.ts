import type { City } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function deleteOne (id: number): Promise<Pick<City, 'id'>> {
  const CITY_NOT_FOUND = 'Cidade não encontrada.'

  try {
    const city = await prismaClient.city.delete({
      where: { id },
      select: {
        id: true
      }
    })

    return city
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new BadRequestError(CITY_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
