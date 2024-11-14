import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { userServices } from '../services/userServices'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const USER_FOUND = 'Usuário recuperado com sucesso.'

  const id = req.params.id

  const user = await userServices.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: USER_FOUND, user })
}
