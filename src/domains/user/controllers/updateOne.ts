import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { userServices } from '../services/userServices'
import { type UserToBeUpdated } from '../userInterfaces'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const USER_SUCCESSFULLY_UPDATED = 'Usuário atualizado com sucesso.'

  const userToBeUpdated: UserToBeUpdated = {
    clientId: req.body.clientId,
    email: req.body.email,
    name: req.body.name,
    roleId: req.body.roleId
  }

  const userToBeUpdatedId = req.params.id

  const userId = await userServices.updateOne(userToBeUpdatedId, userToBeUpdated)

  return res.status(HttpStatusCode.Ok).json({ message: USER_SUCCESSFULLY_UPDATED, userId })
}
