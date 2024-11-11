import type { Prisma } from '@prisma/client'

import type { CityToBeReturned } from '../cityInterfaces'
import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findMany (where: Partial<Prisma.CityWhereInput>): Promise<CityToBeReturned[]> {
  try {
    const city = await prismaClient.city.findMany({
      where,
      select: {
        id: true,
        name: true,
        stateId: true
      },
      orderBy: { id: 'asc' }
    })

    return city
  } catch (error) {
    throw new DatabaseError(error)
  }
}
