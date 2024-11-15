import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { userServices } from '../services/userServices'

export async function activateOne (req: Request, res: Response): Promise<Response> {
  const USER_SUCCESSFULLY_ACTIVATED = 'Usuário ativado com sucesso.'

  const userToBeActivatedId = req.params.id

  const userId = await userServices.activateOne(userToBeActivatedId)

  return res.status(HttpStatusCode.Ok).json({ message: USER_SUCCESSFULLY_ACTIVATED, userId })
}
