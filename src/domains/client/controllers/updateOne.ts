import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ClientToBeUpdated } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_UPDATED = 'Cliente atualizado com sucesso.'

  const clientId = req.params.id

  const clientToBeUpdated: ClientToBeUpdated = {
    cnpj: req.body.cnpj,
    corporateName: req.body.corporateName,
    fantasyName: req.body.fantasyName,
    segment: req.body.segment,
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
      : null,
    managerName: req.body.managerName,
    managerPhoneNumber: req.body.managerPhoneNumber,
    managerEmail: req.body.managerEmail,
    financePhoneNumber: req.body.financePhoneNumber,
    lumpSumInCents: req.body.lumpSumInCents,
    unitValueInCents: req.body.unitValueInCents,
    contractUrl: req.body.contractUrl
  }

  const clientIdReturned = await clientServices.updateOne(clientId, clientToBeUpdated)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_UPDATED, clientId: clientIdReturned })
}
