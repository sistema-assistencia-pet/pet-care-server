import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { voucherServices } from '../services/voucherServices'

export async function activateOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_ACTIVATED = 'Voucher ativado com sucesso.'

  const voucherId = req.params.id

  await voucherServices.activateOne(voucherId)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_ACTIVATED })
}
