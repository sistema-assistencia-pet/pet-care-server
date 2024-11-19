import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { type MemberToBeCreated } from '../memberInterfaces'
import { memberServices } from '../services/memberServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_CREATED = 'Associado cadastrado com sucesso.'

  const memberToBeCreated: MemberToBeCreated = {
    birthDate: req.body.birthDate,
    address: {
      cep: req.body.address.cep,
      street: req.body.address.street,
      number: req.body.address.number,
      complement: req.body.address.complement,
      neighborhood: req.body.address.neighborhood,
      cityId: req.body.address.cityId,
      stateId: req.body.address.stateId
    },
    clientId: req.body.clientId,
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  }

  const memberId = await memberServices.createOne(memberToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: MEMBER_SUCCESSFULLY_CREATED, memberId })
}
