import type { Client } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findOneById (id: string, data?: Partial<Client>): Promise<Client | null> {
  try {
    const where = { id }

    if (data) Object.assign(where, data)

    const client = await prismaClient.client.findUnique({
      where
    })

    return client
  } catch (error) {
    throw new DatabaseError(error)
  }
}
