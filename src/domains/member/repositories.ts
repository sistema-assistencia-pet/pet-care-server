import { Member, MemberFirstAcessCode } from '@prisma/client'
import prismaClient from '../../database/connection'

import { DatabaseError } from '../../errors'
import { status } from '../../enums/statusEnum'

const findOneByCpf = async (cpf: string): Promise<Member | null> => {
  try {
    const member = await prismaClient.member.findUnique({
      where: { cpf, statusId: status.ACTIVE }
    })

    return member
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const updateOne = async (memberId: string, data: Partial<Member>): Promise<void> => {
  try {
    await prismaClient.member.update({
      data,
      where: { id: memberId }
    })
  } catch (error) {
    
  }
}

const findOneFirstAccessCode = async (memberId: string): Promise<MemberFirstAcessCode | null> => {
  try {
    const firstAccessCodeData = await prismaClient.memberFirstAcessCode.findUnique({
      where: { memberId }
    })

    return firstAccessCodeData
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const upsertOneFirstAccessCode = async (memberId: string, firstAccessCode: string): Promise<void> => {
  try {
    await prismaClient.memberFirstAcessCode.upsert({
      create: { memberId, firstAccessCode },
      update: { firstAccessCode },
      where: { memberId }
    })
  } catch (error) {
    throw new DatabaseError(error)
  }
}

export default {
  findOneByCpf,
  findOneFirstAccessCode,
  updateOne,
  upsertOneFirstAccessCode
}
