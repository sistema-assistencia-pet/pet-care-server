import type { State } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findAll (): Promise<State[]> {
  try {
    const states = await prismaClient.state.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: { id: 'asc' }
    })

    return states
  } catch (error) {
    throw new DatabaseError(error)
  }
}
