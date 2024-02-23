import { Client } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../errors'
import { ClientToBeCreated } from './interfaces'
import prismaClient from '../../database/connection'
import { prismaErrors } from '../../enums/prismaErrors'
import { status } from '../../enums/statusEnum'

const createOne = async (clientToBeCreated: ClientToBeCreated): Promise<Pick<Client, 'id'>> => {
  const CLIENT_ALREADY_EXISTS = 'CNPJ já cadastrado.'

  try {
    const client = await prismaClient.client.create({
      data: { ...clientToBeCreated },
      select: {
        id: true,
      }
    })
  
    return client
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError(CLIENT_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}

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

export default { createOne, findOneByCnpj, findOneById }
