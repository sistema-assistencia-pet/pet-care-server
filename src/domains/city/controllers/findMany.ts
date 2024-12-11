/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { cityServices } from '../services/cityServices'
import type { FindManyCitiesQueryParams } from '../cityInterfaces'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const CITY_LIST_FETCHED = 'Lista de cidades recuperada com sucesso.'

  const queryParams: FindManyCitiesQueryParams = {
    searchInput: req.query['search-input'] as string | undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    stateId: req.query['state-id'] ? parseInt(req.query['state-id'] as string) : undefined,
    take: req.query.take ? parseInt(req.query.take as string) : undefined
  }

  const { items: cities, totalCount } = await cityServices.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: CITY_LIST_FETCHED, cities })
}
