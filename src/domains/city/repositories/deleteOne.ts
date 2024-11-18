import type { City } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

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
      (error.code === prismaError.NOT_FOUND)
    ) throw new BadRequestError(CITY_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
