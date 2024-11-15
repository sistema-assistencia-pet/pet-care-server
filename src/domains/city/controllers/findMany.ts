import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { cityServices } from '../services/cityServices'
import type { FindManyCitiesQueryParams } from '../cityInterfaces'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const CITY_LIST_FETCHED = 'Lista de cidades recuperada com sucesso.'

  const queryParams: FindManyCitiesQueryParams = {
    searchInput: req.query['search-input'] as string | undefined,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    stateId: req.query['state-id'] ? parseInt(req.query['state-id'] as string) : undefined
  }

  const { items: cities, totalCount } = await cityServices.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: CITY_LIST_FETCHED, cities })
}
