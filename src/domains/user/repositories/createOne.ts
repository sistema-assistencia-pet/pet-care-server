import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type User } from '@prisma/client'

import { BadRequestError, DatabaseError } from '../../../errors'
import { prismaErrors } from '../../../enums/prismaErrors'
import { type UserToBeCreated } from '../interfaces'

const createOne = async (userToBeCreated: UserToBeCreated): Promise<Pick<User, 'id'>> => {
  try {
    const user = await prismaClient.user.create({
      data: { ...userToBeCreated },
      select: {
        id: true
      }
    })

    return user
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError('CPF ou e-mail já cadastrado.')

    throw new DatabaseError(error)
  }
}

export { createOne }
