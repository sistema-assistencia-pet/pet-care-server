import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { VoucherRedemption } from '@prisma/client'

import { BadRequestError, DatabaseError, NotFoundError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function updateOne (
  id: VoucherRedemption['id'],
  data: Partial<VoucherRedemption>
): Promise<VoucherRedemption['id']> {
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'
  const VOUCHER_REDEMPTION_ALREADY_EXISTS = 'Resgate de voucher já cadastrado. Campo FIELD_NAME já existe.'
  const VOUCHER_REDEMPTION_NOT_FOUND = 'Registro de resgate de voucher não encontrado.'

  try {
    const voucherRedemption = await prismaClient.voucherRedemption.update({
      data,
      where: { id },
      select: { id: true }
    })

    return voucherRedemption.id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(VOUCHER_REDEMPTION_NOT_FOUND)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) throw new BadRequestError(INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? ''))

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(VOUCHER_REDEMPTION_ALREADY_EXISTS.replace('FIELD_NAME', error.meta?.target as string ?? ''))

    throw new DatabaseError(error)
  }
}
