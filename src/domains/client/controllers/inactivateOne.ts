import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { clientServices } from '../services/clientServices'

export async function inactivateOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_INACTIVATED = 'Cliente inativado com sucesso.'

  const clientId = req.params.id

  await clientServices.inactivateOne(clientId)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_INACTIVATED })
}
