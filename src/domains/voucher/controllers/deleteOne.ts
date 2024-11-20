import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { voucherServices } from '../services/voucherServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_DELETED = 'Estabelecimento excluído com sucesso.'

  const voucherId = req.params.id

  await voucherServices.deleteOne(voucherId)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_DELETED })
}
