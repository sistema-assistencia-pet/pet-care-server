import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { BadRequestError } from '../../../errors'
import { voucherCodeServices } from '../services/voucherCodeServices'

export async function createMany (req: Request, res: Response): Promise<Response> {
  const VOUCHER_CODES_SUCCESSFULLY_CREATED = 'Códigos de voucher cadastrado com sucesso.'

  const FILE_NOT_FOUND = 'O arquivo .csv não foi recebido.'

  const voucherId: string = req.params.voucherId
  const file = req.file?.buffer

  if (file === undefined) throw new BadRequestError(FILE_NOT_FOUND)

  await voucherCodeServices.createMany(voucherId, file)

  return res.status(HttpStatusCode.Created).json({ message: VOUCHER_CODES_SUCCESSFULLY_CREATED })
}
