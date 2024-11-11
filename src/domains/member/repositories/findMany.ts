import prismaClient from '../../../database/connection'

import { DatabaseError } from '../../../errors'
import type { FindManyMembersWhere, MemberToBeReturnedOnFindMany } from '../memberInterfaces'

export async function findMany (
  skip: number,
  take: number,
  where: Partial<FindManyMembersWhere>
): Promise<MemberToBeReturnedOnFindMany[]> {
  try {
    const members = await prismaClient.member.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        roleId: true,
        client: {
          select: {
            cnpj: true,
            fantasyName: true
          }
        },
        name: true,
        cpf: true,
        email: true,
        birthDate: true,
        phoneNumber: true,
        cep: true,
        totalSavings: true,
        statusId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return members
  } catch (error) {
    throw new DatabaseError(error)
  }
}
