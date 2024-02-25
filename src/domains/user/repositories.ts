import prismaClient from '../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type User } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../errors'
import { status } from '../../enums/statusEnum'
import { type UserToBeCreated } from './interfaces'

const createOne = async (userToBeCreated: UserToBeCreated): Promise<Pick<User, 'id'>> => {
  try {
    const user = await prismaClient.user.create({
      data: { ...userToBeCreated, statusId: status.ACTIVE },
      select: {
        id: true
      }
    })

    return user
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === 'P2002')
    ) throw new BadRequestError('CPF ou e-mail já cadastrado.')

    throw new DatabaseError(error)
  }
}

const findOneByCpf = async (cpf: string): Promise<User | null> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { cpf, statusId: status.ACTIVE }
    })

    return user
  } catch (error) {
    throw new DatabaseError(error)
  }
}

export default { createOne, findOneByCpf }
