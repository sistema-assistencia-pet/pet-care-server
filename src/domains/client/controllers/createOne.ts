import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ClientToBeCreated } from '../interfaces'
import clientService from '../service'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_CREATED = 'Cliente cadastrado com sucesso.'

  const clientToBeCreated: ClientToBeCreated = {
    cnpj: req.body.cnpj,
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
    contractUrl: req.body.contractUrl,
    statusId: req.body.statusId
  }

  const clientId = await clientService.createOne(clientToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: CLIENT_SUCCESSFULLY_CREATED, clientId })
}
