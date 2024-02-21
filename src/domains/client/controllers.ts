import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import { FindManyClientsQueryParams, ClientToBeCreated } from './interfaces'
import clientService from './services'


const createOne = async (req: Request, res: Response): Promise<Response> => {
  const CLIENT_SUCCESSFULLY_CREATED = 'Cliente criado com sucesso.'

  const clientToBeCreated: ClientToBeCreated = {
    birthDate: req.body.birthDate,
    cep: req.body.cep,
    clientId: req.body.clientId,
    cpf: req.body.cpf,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    statusId: req.body.statusId
  }

  const clientId = await clientService.createOne(clientToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: CLIENT_SUCCESSFULLY_CREATED, clientId })
}

const findMany = async (req: Request, res: Response): Promise<Response> => {
  const CLIENTS_FOUND = 'Clientes encontrados com sucesso.'

  const queryParams: FindManyClientsQueryParams = {
    take: parseInt(req.query['take'] as string),
    skip: parseInt(req.query['skip'] as string),
    clientCnpj: req.query['clientCnpj'] as string | undefined,
    cpf: req.query['cpf'] as string | undefined,
    name: req.query['name'] as string | undefined,
    statusId: parseInt(req.query['statusId'] as string)
  }

  const { items: clients, totalCount } = await clientService.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: CLIENTS_FOUND, clients })
}

const findOneById = async (req: Request, res: Response): Promise<Response> => {
  const CLIENT_FOUND = 'Cliente encontrado com sucesso.'

  const id = req.params['id']

  const client = await clientService.findOneById(id)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_FOUND, client })
}

const activateOne = async (req: Request, res: Response): Promise<Response> => {
  const CLIENT_SUCCESSFULLY_ACTIVATED = 'Cliente ativado com sucesso.'

  const clientId = req.params['id']

  await clientService.activateOne(clientId)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_ACTIVATED })
}

const inactivateOne = async (req: Request, res: Response): Promise<Response> => {
  const CLIENT_SUCCESSFULLY_INACTIVATED = 'Cliente inativado com sucesso.'

  const clientId = req.params['id']

  await clientService.inactivateOne(clientId)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_INACTIVATED })
}

const deleteOne = async (req: Request, res: Response): Promise<Response> => {
  const CLIENT_SUCCESSFULLY_DELETED = 'Cliente excluído com sucesso.'

  const clientId = req.params['id']

  await clientService.deleteOne(clientId)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_SUCCESSFULLY_DELETED })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne
}
