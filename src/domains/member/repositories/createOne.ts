import { type Member } from '@prisma/client'
import prismaClient from '../../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import { type MemberToBeCreated } from '../memberInterfaces'
import { prismaError } from '../../../enums/prismaError'
import { role } from '../../../enums/role'

export async function createOne (memberToBeCreated: MemberToBeCreated): Promise<Pick<Member, 'id'>> {
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'
  const MEMBER_ALREADY_EXISTS = 'CPF ou e-mail já cadastrado.'

  try {
    const member = await prismaClient.member.create({
      data: { ...memberToBeCreated, roleId: role.MEMBER },
      select: {
        id: true
      }
    })

    return member
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(MEMBER_ALREADY_EXISTS)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) {
      throw new BadRequestError(
        INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? '')
      )
    }

    throw new DatabaseError(error)
  }
}
