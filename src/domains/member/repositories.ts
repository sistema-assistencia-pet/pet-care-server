import { Member, MemberFirstAcessCode, Prisma } from '@prisma/client'
import prismaClient from '../../database/connection'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError, NotFoundError } from '../../errors'
import { FindManyMembersQueryParams, FindManyWhere, MemberToBeCreated, MemberToBeReturned } from './interfaces'
import { prismaErrors } from '../../enums/prismaErrors'
import { status } from '../../enums/statusEnum'

const count = async (where: Prisma.MemberWhereInput): Promise<number> => {
  try {
    const count = await prismaClient.member.count({ where })

    return count
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const createOne = async (memberToBeCreated: MemberToBeCreated): Promise<Pick<Member, 'id'>> => {
  const MEMBER_ALREADY_EXISTS = 'CPF ou e-mail já cadastrado.'
  try {
    const member = await prismaClient.member.create({
      data: { ...memberToBeCreated, statusId: status.ACTIVE },
      select: {
        id: true,
      }
    })
  
    return member
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError(MEMBER_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}

const findMany = async (
  skip: number,
  take: number,
  where: Partial<FindManyWhere>
): Promise<MemberToBeReturned[]> => {
  try {
    const members = await prismaClient.member.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        clientId: true,
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

const findOneById = async (id: string): Promise<Member | null> => {
  try {
    const member = await prismaClient.member.findUnique({
      where: { id, statusId: status.ACTIVE }
    })

    return member
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const updateOne = async (id: string, data: Partial<Member>): Promise<void> => {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'
  
  try {
    await prismaClient.member.update({
      data,
      where: { id }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new NotFoundError(MEMBER_NOT_FOUND)

    throw new DatabaseError(error)
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
  count,
  createOne,
  findMany,
  findOneByCpf,
  findOneById,
  findOneFirstAccessCode,
  updateOne,
  upsertOneFirstAccessCode
}
