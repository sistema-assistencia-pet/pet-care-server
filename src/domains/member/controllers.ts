import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import memberService from './services'
import { MemberToBeCreated } from './interfaces'

const MEMBER_SUCCESSFULLY_CREATED = 'Associado criado com sucesso.'

const createOne = async (req: Request, res: Response): Promise<Response> => {
  const memberToBeCreated: MemberToBeCreated = {
    birthDate: req.body.birthDate,
    cep: req.body.cep,
    clientId: req.body.clientId,
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    statusId: req.body.statusId
  }

  const memberId = await memberService.createOne(memberToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: MEMBER_SUCCESSFULLY_CREATED, memberId })
}

export default { createOne }
