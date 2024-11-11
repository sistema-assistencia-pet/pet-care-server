import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { type MemberToBeCreated } from '../memberInterfaces'
import { type AccessTokenData } from '../../../interfaces'
import { memberServices } from '../services/memberServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_CREATED = 'Associado cadastrado com sucesso.'

  const memberToBeCreated: MemberToBeCreated = {
    birthDate: req.body.birthDate,
    addressId: req.body.addressId,
    clientId: req.body.clientId,
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  }

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const memberId = await memberServices.createOne(accessTokenData, memberToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: MEMBER_SUCCESSFULLY_CREATED, memberId })
}
