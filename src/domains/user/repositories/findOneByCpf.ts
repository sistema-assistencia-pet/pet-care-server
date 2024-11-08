import prismaClient from '../../../database/connection'
import { type User } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import { status } from '../../../enums/statusEnum'

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

export { findOneByCpf }
