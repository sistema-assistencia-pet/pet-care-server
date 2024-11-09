import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { PartnerToBeCreated } from '../interfaces'
import { partnerServices } from '../services/partnerServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const PARTNER_SUCCESSFULLY_CREATED = 'Estabelecimento cadastrado com sucesso.'

  const partnerToBeCreated: PartnerToBeCreated = {
    cnpj: req.body.cnpj,
    corporateName: req.body.corporateName,
    fantasyName: req.body.fantasyName,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    categoryId: req.body.categoryId,
    tags: req.body.tags,
    isOnline: req.body.isOnline,
    managerName: req.body.managerName,
    managerPhoneNumber: req.body.managerPhoneNumber,
    managerEmail: req.body.managerEmail,
    businessPhoneNumber: req.body.businessPhoneNumber,
    about: req.body.about,
    openingHours: req.body.openingHours,
    instagram: req.body.instagram,
    webpage: req.body.webpage,
    contractUrl: req.body.contractUrl,
    benefit1Title: req.body.benefit1Title,
    benefit1Description: req.body.benefit1Description,
    benefit1Rules: req.body.benefit1Rules,
    benefit1Link: req.body.benefit1Link,
    benefit1Voucher: req.body.benefit1Voucher,
    benefit2Title: req.body.benefit2Title,
    benefit2Description: req.body.benefit2Description,
    benefit2Rules: req.body.benefit2Rules,
    benefit2Link: req.body.benefit2Link,
    benefit2Voucher: req.body.benefit2Voucher
  }

  const partnerId = await partnerServices.createOne(partnerToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: PARTNER_SUCCESSFULLY_CREATED, partnerId })
}
