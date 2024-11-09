import prismaClient from '../../../database/connection'
import type { Member } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import { status } from '../../../enums/statusEnum'

export async function findOneByCpf (cpf: string): Promise<Member | null> {
  try {
    const member = await prismaClient.member.findUnique({
      where: { cpf, statusId: status.ACTIVE }
    })

    return member
  } catch (error) {
    throw new DatabaseError(error)
  }
}
