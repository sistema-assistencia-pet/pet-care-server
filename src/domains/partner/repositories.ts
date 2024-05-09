import { type Partner, type Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError, NotFoundError } from '../../errors'
import { PartnerToBeCreated, FindManyPartnersWhere } from './interfaces'
import prismaClient from '../../database/connection'
import { prismaErrors } from '../../enums/prismaErrors'
import { status } from '../../enums/statusEnum'

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

const findMany = async (
  skip: number,
  take: number,
  where: Partial<FindManyClientsWhere>
): Promise<ClientToBeReturned[]> => {
  try {
    const clients = await prismaClient.client.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        cnpj: true,
        corporateName: true,
        fantasyName: true,
        segment: true,
        address: true,
        state: true,
        city: true,
        managerName: true,
        managerPhoneNumber: true,
        managerEmail: true,
        financePhoneNumber: true,
        lumpSum: true,
        unitValue: true,
        totalSavings: true,
        contractUrl: true,
        statusId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return clients
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const findOneByCnpj = async (cnpj: string): Promise<Partner | null> => {
  try {
    const partner = await prismaClient.partner.findUnique({
      where: { cnpj, statusId: status.ACTIVE }
    })

    return partner
  } catch (error) {
    throw new DatabaseError(error)
  }
}

const findOneById = async (id: string, data?: Partial<Partner>): Promise<Partner | null> => {
  try {
    const where = { id }

    if (data) Object.assign(where, data)

    const partner = await prismaClient.partner.findUnique({
      where
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
  findOneByCnpj,
  findOneById,
  updateOne
}
