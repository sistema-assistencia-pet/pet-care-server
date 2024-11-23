import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { clientServices } from '../services/clientServices'

export async function activateOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_ACTIVATED = 'Cliente ativado com sucesso.'

  const clientId = req.params.id

  await clientServices.activateOne(clientId)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_ACTIVATED })
}
