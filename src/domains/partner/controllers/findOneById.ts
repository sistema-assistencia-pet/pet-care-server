import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { partnerServices } from '../services/partnerServices'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const PARTNER_FOUND = 'Estabelecimento recuperado com sucesso.'

  const id = req.params.id

  const partner = await partnerServices.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_FOUND, partner })
}
