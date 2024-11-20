import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'
import type { AccessTokenData } from '../../../interfaces'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const MEMBER_FOUND = 'Associado recuperado com sucesso.'

  const partnerId = req.params.id

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const member = await memberServices.findOneById(accessTokenData, partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_FOUND, member })
}
