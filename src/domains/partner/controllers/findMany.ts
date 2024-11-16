/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { FindManyPartnersQueryParams } from '../partnerInterfaces'
import { partnerServices } from '../services/partnerServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const PARTNERS_FOUND = 'Estabelecimentos recuperados com sucesso.'

  let isOnline: any = null
  if (req.query['is-online'] === 'true') isOnline = true
  if (req.query['is-online'] === 'false') isOnline = false

  const queryParams: FindManyPartnersQueryParams = {
    categoryId: req.query['category-id'] ? parseInt(req.query['category-id'] as string) : undefined,
    cityId: req.query['city-id'] ? parseInt(req.query['city-id'] as string) : undefined,
    isOnline,
    searchInput: req.query['search-input'] as string | undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    stateId: req.query['state-id'] ? parseInt(req.query['state-id'] as string) : undefined,
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined,
    take: req.query.take ? parseInt(req.query.take as string) : undefined
  }

  const { items: partners, totalCount } = await partnerServices.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: PARTNERS_FOUND, partners })
}
