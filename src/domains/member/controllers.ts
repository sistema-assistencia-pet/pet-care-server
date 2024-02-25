import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import { FindManyMembersQueryParams, MemberToBeCreated } from './interfaces'
import memberService from './services'


const createOne = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_SUCCESSFULLY_CREATED = 'Associado cadastrado com sucesso.'

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
  const MEMBERS_FOUND = 'Associados recuperados com sucesso.'

  const queryParams: FindManyMembersQueryParams = {
    take: parseInt(req.query['take'] as string),
    skip: parseInt(req.query['skip'] as string),
    clientCnpj: req.query['clientCnpj'] as string | undefined,
    cpf: req.query['cpf'] as string | undefined,
    name: req.query['name'] as string | undefined,
    statusId: parseInt(req.query['statusId'] as string)
  }

  const { items: members, totalCount } = await memberService.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: MEMBERS_FOUND, members })
}

const findOneById = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_FOUND = 'Associado recuperado com sucesso.'

  const id = req.params['id']

  const member = await memberService.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_FOUND, member })
}

const activateOne = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_SUCCESSFULLY_ACTIVATED = 'Associado ativado com sucesso.'

  const memberId = req.params['id']

  await memberService.activateOne(memberId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_ACTIVATED })
}

const inactivateOne = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_SUCCESSFULLY_INACTIVATED = 'Associado inativado com sucesso.'

  const memberId = req.params['id']

  await memberService.inactivateOne(memberId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_INACTIVATED })
}

const deleteOne = async (req: Request, res: Response): Promise<Response> => {
  const MEMBER_SUCCESSFULLY_DELETED = 'Associado excluído com sucesso.'

  const memberId = req.params['id']

  await memberService.deleteOne(memberId)

  return res.status(HttpStatusCode.Ok).json({ message: MEMBER_SUCCESSFULLY_DELETED })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne
}
