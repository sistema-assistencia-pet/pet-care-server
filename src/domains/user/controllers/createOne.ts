import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { userServices } from '../services/userServices'
import { type UserToBeCreated } from '../userInterfaces'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const USER_SUCCESSFULLY_CREATED = 'Usuário cadastrado com sucesso.'

  const userToBeCreated: UserToBeCreated = {
    clientId: req.body.clientId,
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    roleId: req.body.roleId
  }

  const userId = await userServices.createOne(userToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: USER_SUCCESSFULLY_CREATED, userId })
}
