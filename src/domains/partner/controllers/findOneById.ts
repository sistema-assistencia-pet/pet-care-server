import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import { partnerServices } from '../services/partnerServices'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const PARTNER_FOUND = 'Estabelecimento recuperado com sucesso.'

  const partnerId = req.params.id

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const partner = await partnerServices.findOneById(accessTokenData, partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_FOUND, partner })
}
