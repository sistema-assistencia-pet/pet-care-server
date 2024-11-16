import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { PartnerToBeCreated } from '../partnerInterfaces'
import { partnerServices } from '../services/partnerServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_CREATED = 'Estabelecimento cadastrado com sucesso.'

  const partnerToBeCreated: PartnerToBeCreated = {
    cnpj: req.body.cnpj,
    corporateName: req.body.corporateName,
    fantasyName: req.body.fantasyName,
    address: {
      cep: req.body.address.cep,
      street: req.body.address.street,
      number: req.body.address.number,
      complement: req.body.address.complement,
      neighborhood: req.body.address.neighborhood,
      cityId: req.body.address.cityId,
      stateId: req.body.address.stateId
    },
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

  const partnerId = await partnerServices.createOne(partnerToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: PARTNER_SUCCESSFULLY_CREATED, partnerId })
}
