import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { FindManyClientsQueryParams } from '../interfaces'
import clientService from '../service'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const CLIENTS_FOUND = 'Clientes recuperados com sucesso.'

  const queryParams: FindManyClientsQueryParams = {
    take: req.query.take ? parseInt(req.query.take as string) : undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    cnpj: req.query.cnpj as string | undefined,
    fantasyName: req.query['fantasy-name'] as string | undefined,
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined
  }

  const { items: clients, totalCount } = await clientService.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: CLIENTS_FOUND, clients })
}
