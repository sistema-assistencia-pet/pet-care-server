import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'

export async function inactivateOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_INACTIVATED = 'Associado inativado com sucesso.'

  const memberId = req.params.id

  await memberServices.inactivateOne(memberId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_INACTIVATED })
}
