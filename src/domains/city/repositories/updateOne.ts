import type { City } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { CityToBeUpdated } from '../cityInterfaces'
import prismaClient from '../../../database/connection'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function updateOne (cityToBeUpdated: CityToBeUpdated): Promise<Pick<City, 'id'>> {
  const CITY_ALREADY_EXISTS = 'Cidade já cadastrada.'
  const CITY_NOT_FOUND = 'Cidade não encontrada.'

  const { id, ...cityToBeUpdatedWithoutId } = cityToBeUpdated

  try {
    const city = await prismaClient.city.update({
      where: { id },
      data: { ...cityToBeUpdatedWithoutId },
      select: {
        id: true
      }
    })

    return city
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError(CITY_ALREADY_EXISTS)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new BadRequestError(CITY_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
