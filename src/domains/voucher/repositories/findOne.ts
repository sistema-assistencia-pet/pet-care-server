import type { Prisma } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import type { VoucherToBeReturnedByDb } from '../voucherInterfaces'

export async function findOne (
  uniqueProps: Prisma.VoucherWhereUniqueInput,
  fullInfo: boolean,
  optionalFilter?: Prisma.VoucherWhereInput
): Promise<VoucherToBeReturnedByDb | null> {
  try {
    const where = { ...uniqueProps }

    if (optionalFilter !== undefined) Object.assign(where, optionalFilter)

    const voucher = await prismaClient.voucher.findUnique({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        rules: true,
        value: true,
        status: {
          select: {
            id: true,
            translation: true
          }
        },
        partner: {
          select: {
            id: true,
            cnpj: true,
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
        },
        memberVoucherWaitingLines: fullInfo
          ? {
              select: {
                waitingUntil: true
              }
            }
          : undefined,
        createdAt: true,
        updatedAt: true
      }
    })

    return voucher
  } catch (error) {
    throw new DatabaseError(error)
  }
}
