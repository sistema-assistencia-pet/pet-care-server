import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import type { VoucherCodeToBeCreated } from '../voucherCodeInterfaces'
import { voucherCodeServices } from '../services/voucherCodeServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_CODE_SUCCESSFULLY_CREATED = 'Código de voucher cadastrado com sucesso.'

  const voucherCodeToBeCreated: VoucherCodeToBeCreated = {
    code: req.body.code,
    voucherId: req.body.voucherId
  }

  const voucherCodeId = await voucherCodeServices.createOne(voucherCodeToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: VOUCHER_CODE_SUCCESSFULLY_CREATED, voucherCodeId })
}
