import { Client } from '@prisma/client'

import { DatabaseError } from '../../errors'
import prismaClient from '../../database/connection'
import { status } from '../../enums/statusEnum'

const findOneByCnpj = async (cnpj: string): Promise<Client | null> => {
  try {
    const client = await prismaClient.client.findUnique({
      where: { cnpj, statusId: status.ACTIVE }
    })

    return client
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const findOneById = async (id: string): Promise<Client | null> => {
  try {
    const client = await prismaClient.client.findUnique({
      where: { id, statusId: status.ACTIVE }
    })

    return client
  } catch (error) {
    throw new DatabaseError(error)
  }
}

export default { findOneByCnpj, findOneById }
