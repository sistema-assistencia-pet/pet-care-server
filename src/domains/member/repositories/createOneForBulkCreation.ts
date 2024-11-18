import type { Member } from '@prisma/client'
import prismaClient from '../../../database/connection'

import type { MemberToBeCreated } from '../memberInterfaces'
import { role } from '../../../enums/role'

export async function createOneForBulkCreation (memberToBeCreated: MemberToBeCreated): Promise<Pick<Member, 'id'>> {
  const member = await prismaClient.member.create({
    data: { ...memberToBeCreated, roleId: role.MEMBER },
    select: {
      id: true
    }
  })

  return member
}
