import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'

export async function findOneById (req: Request, res: Response): Promise<Response> {
  const MEMBER_FOUND = 'Associado recuperado com sucesso.'

  const id = req.params.id

  const member = await memberServices.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_FOUND, member })
}
