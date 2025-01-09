import { DatabaseError } from '../../../errors'
import type { MemberWithClientData } from '../memberInterfaces'
import prismaClient from '../../../database/connection'
import { status } from '../../../enums/status'

export async function findOneByCpf (cpf: string): Promise<MemberWithClientData | null> {
  try {
    const member = await prismaClient.member.findUnique({
      where: { cpf, statusId: status.ACTIVE, client: { statusId: status.ACTIVE } },
      include: {
        client: {
          select: {
            id: true,
            fantasyName: true
          }
        }
      }
    })

    return member
  } catch (error) {
    throw new DatabaseError(error)
  }
}
