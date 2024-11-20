import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'
import type { FindManyMembersParams, MemberToBeReturnedOnFindMany } from '../memberInterfaces'

export async function findMany ({ skip, take, where }: FindManyMembersParams): Promise<MemberToBeReturnedOnFindMany[]> {
  try {
    const members = await prismaClient.member.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cpf: true,
        name: true,
        client: { select: { id: true, cnpj: true, fantasyName: true } },
        status: { select: { id: true, translation: true } },
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return members
  } catch (error) {
    throw new DatabaseError(error)
  }
}
