import csv from 'csv-parser'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { convertBufferToStream } from '../../../utils/convertBufferToStream'
import { NotFoundError } from '../../../errors'
import { prismaError } from '../../../enums/prismaError'
import type { VoucherCodeToBeCreated } from '../voucherCodeInterfaces'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { voucherCodeRepositories } from '../repositories/voucherCodeRepositories'

export async function createMany (voucherId: string, fileBuffer: Buffer): Promise<void> {
  const VOUCHER_NOT_FOUND = 'Voucher não encontrado.'

  const voucher = await voucherRepositories.findOne({ id: voucherId }, false)

  if (voucher === null) throw new NotFoundError(VOUCHER_NOT_FOUND)

  const fileStream = convertBufferToStream(fileBuffer)

  fileStream
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const voucherCodeToBeCreated: VoucherCodeToBeCreated = {
          code: row.codigo,
          voucherId
        }

        await voucherCodeRepositories.createOneForBulkCreation(voucherCodeToBeCreated)
      } catch (error) {
        if (
          (error instanceof PrismaClientKnownRequestError) &&
          (error.code === prismaError.ALREADY_EXITS)
        ) {
          logger.error(`O código ${row.codigo} não foi cadastrado para o voucher com id ${voucherId}: erro ao cadastrar no banco de dados.`)
        }
      }
    })
}
