import type { Prisma, VoucherSettingsByClient } from '@prisma/client'
import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findMany (where: Partial<Prisma.VoucherSettingsByClientWhereInput>): Promise<VoucherSettingsByClient[]> {
  try {
    return await prismaClient.voucherSettingsByClient.findMany({ where })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
