import type { Partner, Address } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { PartnerToBeCreated } from '../partnerInterfaces'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (
  { address, ...partnerToBeCreated }: PartnerToBeCreated,
  addressId: Address['id'] | null
): Promise<Pick<Partner, 'id'>> {
  const PARTNER_ALREADY_EXISTS = 'Estabelecimento já cadastrado.'

  try {
    const partner = await prismaClient.partner.create({
      data: {
        addressId,
        cityId: address === null ? null : address.cityId,
        stateId: address === null ? null : address.stateId,
        ...partnerToBeCreated
      },
      select: { id: true }
    })

    return partner
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(PARTNER_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
