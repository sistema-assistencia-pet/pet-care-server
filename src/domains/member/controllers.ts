import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import { FindManyMembersQueryParams, MemberToBeCreated } from './interfaces'
import memberService from './services'


const createOne = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_SUCCESSFULLY_CREATED = 'Associado criado com sucesso.'

  const memberToBeCreated: MemberToBeCreated = {
    birthDate: req.body.birthDate,
    cep: req.body.cep,
    clientId: req.body.clientId,
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    statusId: req.body.statusId
  }

  const memberId = await memberService.createOne(memberToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: MEMBER_SUCCESSFULLY_CREATED, memberId })
}

const findMany = async (req: Request, res: Response): Promise<Response> => {
  const MEMBERS_FOUND = 'Associados encontrados com sucesso.'

  const queryParams: FindManyMembersQueryParams = {
    take: parseInt(req.query['take'] as string),
    skip: parseInt(req.query['skip'] as string)
  }

  if (typeof req.query['clientCnpj'] === 'string') Object.assign(queryParams, { clientCnpj: req.query['clientCnpj'] })
  if (typeof req.query['cpf'] === 'string') Object.assign(queryParams, { cpf: req.query['cpf'] })
  if (typeof req.query['name'] === 'string') Object.assign(queryParams, { name: req.query['name'] })
  if (typeof req.query['statusId'] === 'string') Object.assign(queryParams, { statusId: parseInt(req.query['statusId']) })

  const members = await memberService.findMany(queryParams)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBERS_FOUND, members })
}

const findOneById = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_FOUND = 'Associado encontrado com sucesso.'

  const id = req.params['id']

  const member = await memberService.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_FOUND, member })
}

export default { createOne, findMany, findOneById }
