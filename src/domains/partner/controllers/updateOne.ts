import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { PartnerToBeUpdated } from '../partnerInterfaces'
import { partnerServices } from '../services/partnerServices'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_UPDATED = 'Estabelecimento atualizado com sucesso.'

  const partnerId = req.params.id

  const partnerToBeUpdated: PartnerToBeUpdated = {
    cnpj: req.body.cnpj,
    password: req.body.password,
    corporateName: req.body.corporateName,
    fantasyName: req.body.fantasyName,
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
    categoryId: req.body.categoryId,
    tags: req.body.tags,
    isOnline: req.body.isOnline,
    managerName: req.body.managerName,
    managerPhoneNumber: req.body.managerPhoneNumber,
    managerEmail: req.body.managerEmail,
    businessPhoneNumber: req.body.businessPhoneNumber,
    about: req.body.about,
    openingHours: req.body.openingHours
  }

  const parterId = await partnerServices.updateOne(partnerId, partnerToBeUpdated)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_UPDATED, parterId })
}
