import { type Partner, type Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError, NotFoundError } from '../../errors'
import { FindManyPartnersParams, PartnerDetailsToBeReturned, PartnerToBeCreated, PartnerToBeReturned } from './interfaces'
import prismaClient from '../../database/connection'
import { prismaErrors } from '../../enums/prismaErrors'

const count = async (where: Prisma.PartnerWhereInput): Promise<number> => {
  try {
    const count = await prismaClient.partner.count({ where })

    return count
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const createOne = async (partnerToBeCreated: PartnerToBeCreated): Promise<Pick<Partner, 'id'>> => {
  const PARTNER_ALREADY_EXISTS = 'Estabelecimento já cadastrado.'

  try {
    const partner = await prismaClient.partner.create({
      data: { ...partnerToBeCreated },
      select: {
        id: true
      }
    })

    return partner
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError(PARTNER_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}

const findMany = async ({ skip, take, where }: FindManyPartnersParams): Promise<PartnerToBeReturned[]> => {
  try {
    logger.debug({ where }, 'where')

    const partners = await prismaClient.partner.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cnpj: true,
        fantasyName: true,
        category: {
          select: { id: true, name: true }
        },
        isOnline: true,
        statusId: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return partners
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const findOneById = async (id: string, data?: Partial<Partner>): Promise<PartnerDetailsToBeReturned | null> => {
  try {
    const where = { id }

    if (data) Object.assign(where, data)

    const partner = await prismaClient.partner.findUnique({
      where,
      include: { category: true }
    })

    return partner
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const updateOne = async (id: string, data: Partial<Partner>): Promise<void> => {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  try {
    await prismaClient.partner.update({
      data,
      where: { id }
    })
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new NotFoundError(PARTNER_NOT_FOUND)

    throw new DatabaseError(error)
  }
}

export default {
  count,
  createOne,
  findMany,
  findOneById,
  updateOne
}
