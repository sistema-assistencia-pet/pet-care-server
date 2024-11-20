import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { VoucherCode } from '@prisma/client'

import { BadRequestError, DatabaseError, NotFoundError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function updateOne (
  id: VoucherCode['id'],
  data: Partial<VoucherCode>
): Promise<VoucherCode['id']> {
  const INVALID_FOREIGN_KEY = 'Campo FIELD_NAME inválido.'
  const VOUCHER_CODE_ALREADY_EXISTS = 'Código de voucher já cadastrado. Campo FIELD_NAME já existe.'
  const VOUCHER_CODE_NOT_FOUND = 'Código de voucher não encontrado.'

  try {
    const voucherCode = await prismaClient.voucherCode.update({
      data,
      where: { id },
      select: { id: true }
    })

    return voucherCode.id
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.NOT_FOUND)
    ) throw new NotFoundError(VOUCHER_CODE_NOT_FOUND)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.FOREIGN_KEY_CONSTRAINT_FAIL)
    ) throw new BadRequestError(INVALID_FOREIGN_KEY.replace('FIELD_NAME', error.meta?.field_name as string ?? ''))

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(VOUCHER_CODE_ALREADY_EXISTS.replace('FIELD_NAME', error.meta?.target as string ?? ''))

    throw new DatabaseError(error)
  }
}
