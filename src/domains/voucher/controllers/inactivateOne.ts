import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { voucherServices } from '../services/voucherServices'

export async function inactivateOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_INACTIVATED = 'Voucher inativado com sucesso.'

  const voucherId = req.params.id

  await voucherServices.inactivateOne(voucherId)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_INACTIVATED })
}
