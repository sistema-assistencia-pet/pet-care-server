import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { voucherCodeServices } from '../services/voucherCodeServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const VOUCHERCODE_SUCCESSFULLY_DELETED = 'Estabelecimento excluído com sucesso.'

  const voucherCodeId = parseInt(req.params.id)

  await voucherCodeServices.deleteOne(voucherCodeId)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHERCODE_SUCCESSFULLY_DELETED })
}
