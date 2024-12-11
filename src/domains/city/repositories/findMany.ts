import type { CityToBeReturned, FindManyCitiesParams } from '../cityInterfaces'
import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyCitiesParams): Promise<CityToBeReturned[]> {
  try {
    const city = await prismaClient.city.findMany({
      where,
      skip,
      take,
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
