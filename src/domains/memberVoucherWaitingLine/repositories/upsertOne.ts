import { DatabaseError } from '../../../errors'
import type { MemberVoucherWaitingLineToBeCreated } from '../memberVoucherWaitingLineInterfaces'
import prismaClient from '../../../database/connection'

export async function upsertOne (data: MemberVoucherWaitingLineToBeCreated): Promise<void> {
  try {
    await prismaClient.memberVoucherWaitingLine.upsert({
      where: { memberId_voucherId: { memberId: data.memberId, voucherId: data.voucherId } },
      create: data,
      update: { waitingUntil: data.waitingUntil }
    })
  } catch (error) {
    throw new DatabaseError(error)
  }
}
