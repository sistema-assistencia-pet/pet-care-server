import { DatabaseError } from '../../../errors'
import type { FindManyVouchersParams, VoucherToBeReturnedInFindMany } from '../voucherInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyVouchersParams): Promise<VoucherToBeReturnedInFindMany[]> {
  logger.debug(where)
  try {
    const vouchers = await prismaClient.voucher.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        title: true,
        description: true,
        rules: true,
        value: true,
        voucherSettingsByClients: {
          select: {
            reservedBalanceInCents: true
          }
        },
        partner: {
          select: {
            id: true,
            fantasyName: true,
            category: {
              select: {
                id: true,
                name: true
              }
            },
            city: {
              select: {
                id: true,
                name: true
              }
            },
            state: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })

    return vouchers
  } catch (error) {
    throw new DatabaseError(error)
  }
}
