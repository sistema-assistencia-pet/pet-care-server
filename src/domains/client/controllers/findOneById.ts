import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { clientServices } from '../services/clientServices'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const CLIENT_FOUND = 'Cliente recuperado com sucesso.'

  const id = req.params.id

  const client = await clientServices.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_FOUND, client })
}
