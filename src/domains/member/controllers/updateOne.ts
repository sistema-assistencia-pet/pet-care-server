import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { memberServices } from '../services/memberServices'
import type { MemberToBeUpdated } from '../memberInterfaces'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_UPDATED = 'Associado atualizado com sucesso.'

  const memberId = req.params.id

  const memberToBeUpdated: MemberToBeUpdated = {
    birthDate: req.body.birthDate,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    address: req.body.address
      ? {
          cep: req.body.address.cep,
          street: req.body.address.street,
          number: req.body.address.number,
          complement: req.body.address.complement,
          neighborhood: req.body.address.neighborhood,
          cityId: req.body.address.cityId,
          stateId: req.body.address.stateId
        }
      : null
  }

  const memberIdReturned = await memberServices.updateOne(memberId, memberToBeUpdated)

  return res.status(HttpStatusCode.NoContent).json({ message: MEMBER_SUCCESSFULLY_UPDATED, memberId: memberIdReturned })
}
