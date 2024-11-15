import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import { userServices } from '../services/userServices'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const USER_FOUND = 'Usuário recuperado com sucesso.'

  const id = req.params.id

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const user = await userServices.findOneById(accessTokenData, id)

  return res.status(HttpStatusCode.Ok).json({ message: USER_FOUND, user })
}
