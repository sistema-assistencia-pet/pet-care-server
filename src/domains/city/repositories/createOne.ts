import type { City } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { CityToBeCreated } from '../cityInterfaces'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (cityToBeCreated: CityToBeCreated): Promise<Pick<City, 'id'>> {
  const CITY_ALREADY_EXISTS = 'Cidade já cadastrada.'
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'

  try {
    const city = await prismaClient.city.create({
      data: { ...cityToBeCreated },
      select: {
        id: true
      }
    })

    return city
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CITY_ALREADY_EXISTS)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) throw new BadRequestError(INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? ''))

    throw new DatabaseError(error)
  }
}
