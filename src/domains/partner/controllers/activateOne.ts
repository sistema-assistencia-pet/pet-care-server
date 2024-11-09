import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { partnerServices } from '../services/partnerServices'

export async function activateOne (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_ACTIVATED = 'Estabelecimento ativado com sucesso.'

  const partnerId = req.params.id

  await partnerServices.activateOne(partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_ACTIVATED })
}
