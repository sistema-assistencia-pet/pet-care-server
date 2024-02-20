import { Client } from '@prisma/client'

import { DatabaseError } from '../../errors'
import prismaClient from '../../database/connection'

const findOneById = async (id: string): Promise<Client | null> => {
  try {
    const client = await prismaClient.client.findUnique({
      where: { id }
    })

    return client
  } catch (error) {
    throw new DatabaseError(error)
  }
}

export default { findOneById }
