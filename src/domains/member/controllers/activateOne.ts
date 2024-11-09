import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'

export async function activateOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_ACTIVATED = 'Associado ativado com sucesso.'

  const memberId = req.params.id

  await memberServices.activateOne(memberId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_ACTIVATED })
}
