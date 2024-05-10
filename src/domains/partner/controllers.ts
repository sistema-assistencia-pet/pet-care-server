import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { FindManyPartnersQueryParams, PartnerToBeCreated, PartnerToBeUpdated } from './interfaces'
import partnerService from './service'

const createOne = async (req: Request, res: Response): Promise<Response> => {
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

  const partnerId = await partnerService.createOne(partnerToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: PARTNER_SUCCESSFULLY_CREATED, partnerId })
}

const findMany = async (req: Request, res: Response): Promise<Response> => {
  const PARTNERS_FOUND = 'Estabelecimento recuperados com sucesso.'

  const queryParams: FindManyPartnersQueryParams = {
    categoryId: req.query['category-id'] ? parseInt(req.query['category-id'] as string) : undefined,
    isOnline: req.query['is-online'] as boolean | undefined,
    searchInput: req.query.searchInput as string | undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined,
    take: req.query.take ? parseInt(req.query.take as string) : undefined
  }

  const { items: partners, totalCount } = await partnerService.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: PARTNERS_FOUND, partners })
}

const findOneById = async (req: Request, res: Response): Promise<Response> => {
  const PARTNER_FOUND = 'Estabelecimento recuperado com sucesso.'

  const id = req.params.id

  const partner = await partnerService.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_FOUND, partner })
}

const activateOne = async (req: Request, res: Response): Promise<Response> => {
  const PARTNER_SUCCESSFULLY_ACTIVATED = 'Estabelecimento ativado com sucesso.'

  const partnerId = req.params.id

  await partnerService.activateOne(partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_ACTIVATED })
}

const inactivateOne = async (req: Request, res: Response): Promise<Response> => {
  const PARTNER_SUCCESSFULLY_INACTIVATED = 'Estabelecimento inativado com sucesso.'

  const partnerId = req.params.id

  await partnerService.inactivateOne(partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_INACTIVATED })
}

const deleteOne = async (req: Request, res: Response): Promise<Response> => {
  const PARTNER_SUCCESSFULLY_DELETED = 'Estabelecimento excluído com sucesso.'

  const partnerId = req.params.id

  await partnerService.deleteOne(partnerId)

  return res.status(HttpStatusCode.Ok).json({ message: PARTNER_SUCCESSFULLY_DELETED })
}

const updateOne = async (req: Request, res: Response): Promise<Response> => {
  const PARTNER_SUCCESSFULLY_UPDATED = 'Estabelecimento atualizado com sucesso.'

  const partnerId = req.params.id

  const partnerToBeUpdated: Partial<PartnerToBeUpdated> = {
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

  await partnerService.updateOne(partnerId, partnerToBeUpdated)

  return res.status(HttpStatusCode.NoContent).json({ message: PARTNER_SUCCESSFULLY_UPDATED })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne,
  updateOne
}
