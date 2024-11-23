import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ClientToBeCreated } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const CLIENT_SUCCESSFULLY_CREATED = 'Cliente cadastrado com sucesso.'

  const clientToBeCreated: ClientToBeCreated = {
    cnpj: req.body.cnpj,
    corporateName: req.body.corporateName,
    fantasyName: req.body.fantasyName,
    segment: req.body.segment,
    address: {
      cep: req.body.address.cep,
      street: req.body.address.street,
      number: req.body.address.number,
      complement: req.body.address.complement,
      neighborhood: req.body.address.neighborhood,
      cityId: req.body.address.cityId,
      stateId: req.body.address.stateId
    },
    managerName: req.body.managerName,
    managerCpf: req.body.managerCpf,
    managerPassword: req.body.managerPassword,
    managerPhoneNumber: req.body.managerPhoneNumber,
    managerEmail: req.body.managerEmail,
    financePhoneNumber: req.body.financePhoneNumber,
    lumpSum: req.body.lumpSum,
    unitValue: req.body.unitValue,
    contractUrl: req.body.contractUrl
  }

  const clientId = await clientServices.createOne(clientToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: CLIENT_SUCCESSFULLY_CREATED, clientId })
}
