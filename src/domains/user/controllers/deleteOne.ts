import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { userServices } from '../services/userServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const USER_SUCCESSFULLY_DELETED = 'Usuário excluído com sucesso.'

  const userToBeDeletedId = req.params.id

  const userId = await userServices.deleteOne(userToBeDeletedId)

  return res.status(HttpStatusCode.Ok).json({ message: USER_SUCCESSFULLY_DELETED, userId })
}
