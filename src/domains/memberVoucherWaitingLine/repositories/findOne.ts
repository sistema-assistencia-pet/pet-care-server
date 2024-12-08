import type { Member, MemberVoucherWaitingLine, Voucher } from '@prisma/client'

import { DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'

export async function findOne (
  data: { memberId: Member['id'], voucherId: Voucher['id'] }
): Promise<Pick<MemberVoucherWaitingLine, 'waitingUntil'> | null> {
  try {
    const waitingLine = await prismaClient.memberVoucherWaitingLine.findUnique({
      where: { memberId_voucherId: data },
      select: { waitingUntil: true }
    })

    return waitingLine
  } catch (error) {
    throw new DatabaseError(error)
  }
}
