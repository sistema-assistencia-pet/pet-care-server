import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import userService from './services'
import { UserToBeCreated } from './interfaces'

const createOne = async (req: Request, res: Response): Promise<Response> => {
  const USER_SUCCESSFULLY_CREATED = 'Usuário cadastrado com sucesso.'

  const userToBeCreated: UserToBeCreated = {
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    roleId: req.body.roleId
  }

  const userId = await userService.createOne(userToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: USER_SUCCESSFULLY_CREATED, userId })
}

export default { createOne }
