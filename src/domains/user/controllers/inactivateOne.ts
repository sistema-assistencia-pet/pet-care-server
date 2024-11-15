import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { userServices } from '../services/userServices'

export async function inactivateOne (req: Request, res: Response): Promise<Response> {
  const USER_SUCCESSFULLY_INACTIVATED = 'Usuário inativado com sucesso.'

  const userToBeInactivatedId = req.params.id

  const userId = await userServices.inactivateOne(userToBeInactivatedId)

  return res.status(HttpStatusCode.Ok).json({ message: USER_SUCCESSFULLY_INACTIVATED, userId })
}
