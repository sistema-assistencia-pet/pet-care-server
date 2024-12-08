import { DatabaseError } from '../../../errors'
import type { FindManyVoucherSettingsByClientParams, VoucherSettingsByClientToBeReturnedInFindMany } from '../voucherSettingsByClientInterfaces'
import prismaClient from '../../../database/connection'

export async function findMany ({ skip, take, where }: FindManyVoucherSettingsByClientParams): Promise<VoucherSettingsByClientToBeReturnedInFindMany[]> {
  try {
    return await prismaClient.voucherSettingsByClient.findMany({
      where,
      take,
      skip,
      select: {
        reservedBalanceInCents: true,
        waitingTimeInHours: true,
        voucher: {
          select: {
            id: true,
            title: true,
            description: true,
            rules: true,
            value: true,
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
        }
      }
    })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
