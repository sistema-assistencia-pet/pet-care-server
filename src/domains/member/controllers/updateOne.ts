import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'
import type { MemberToBeUpdated } from '../memberInterfaces'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_UPDATED = 'Associado atualizado com sucesso.'

  const memberId = req.params.id

  const memberToBeUpdated: Partial<MemberToBeUpdated> = {
    birthDate: req.body.birthDate,
    cep: req.body.cep,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  }

  await memberServices.updateOne(memberId, memberToBeUpdated)

  return res.status(HttpStatusCode.NoContent).json({ message: MEMBER_SUCCESSFULLY_UPDATED })
}
