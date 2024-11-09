import type { Client } from '@prisma/client'
import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { status } from '../../../enums/statusEnum'

export async function findOneByCnpj (cnpj: string): Promise<Client | null> {
  try {
    const client = await prismaClient.client.findUnique({
      where: { cnpj, statusId: status.ACTIVE }
    })

    return client
  } catch (error) {
    throw new DatabaseError(error)
  }
}
