import type { CategoryToBeReturned } from '../categoryInterfaces'
import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findAll (): Promise<CategoryToBeReturned[]> {
  try {
    const city = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: { id: 'asc' }
    })

    return city
  } catch (error) {
    throw new DatabaseError(error)
  }
}
