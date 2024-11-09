import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { partnerServices } from '../services/partnerServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_DELETED = 'Estabelecimento excluído com sucesso.'

  const partnerId = req.params.id

  await partnerServices.deleteOne(partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_DELETED })
}
