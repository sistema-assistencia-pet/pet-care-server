import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ClientToBeUpdated } from '../interfaces'
import clientService from '../service'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_UPDATED = 'Cliente atualizado com sucesso.'

  const clientId = req.params.id

  const clientToBeUpdated: Partial<ClientToBeUpdated> = {
    corporateName: req.body.corporateName,
    fantasyName: req.body.fantasyName,
    segment: req.body.segment,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    managerName: req.body.managerName,
    managerPhoneNumber: req.body.managerPhoneNumber,
    managerEmail: req.body.managerEmail,
    financePhoneNumber: req.body.financePhoneNumber,
    lumpSum: req.body.lumpSum,
    unitValue: req.body.unitValue,
    contractUrl: req.body.contractUrl
  }

  await clientService.updateOne(clientId, clientToBeUpdated)

  return res.status(HttpStatusCode.NoContent).json({ message: CLIENT_SUCCESSFULLY_UPDATED })
}
