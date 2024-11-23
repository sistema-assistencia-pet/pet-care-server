import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { clientServices } from '../services/clientServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_DELETED = 'Cliente excluído com sucesso.'

  const clientId = req.params.id

  await clientServices.deleteOne(clientId)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_DELETED })
}
