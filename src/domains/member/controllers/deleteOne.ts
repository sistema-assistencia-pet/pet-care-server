import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_DELETED = 'Associado excluído com sucesso.'

  const memberId = req.params.id

  await memberServices.deleteOne(memberId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_DELETED })
}
