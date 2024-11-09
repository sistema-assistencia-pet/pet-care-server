import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { partnerServices } from '../services/partnerServices'

export async function inactivateOne (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_INACTIVATED = 'Estabelecimento inativado com sucesso.'

  const partnerId = req.params.id

  await partnerServices.inactivateOne(partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_INACTIVATED })
}
