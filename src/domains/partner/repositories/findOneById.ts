import type { Partner} from '@prisma/client'

import { DatabaseError } from '../../../errors'
import type { PartnerDetailsToBeReturned } from '../partnerInterfaces'
import prismaClient from '../../../database/connection'

export async function findOneById (id: string, data?: Partial<Partner>): Promise<PartnerDetailsToBeReturned | null> {
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
