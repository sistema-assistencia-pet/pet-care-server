/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { FindManyClientsQueryParams } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const CLIENTS_FOUND = 'Clientes recuperados com sucesso.'

  const queryParams: FindManyClientsQueryParams = {
    searchInput: req.query['search-input'] as string | undefined,
    take: req.query.take ? parseInt(req.query.take as string) : undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined
  }

  const { items: clients, totalCount } = await clientServices.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: CLIENTS_FOUND, clients })
}
