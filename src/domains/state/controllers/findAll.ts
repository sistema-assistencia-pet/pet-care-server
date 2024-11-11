import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { stateServices } from '../services/stateServices'

export async function findAll (_req: Request, res: Response): Promise<Response> {
  const STATE_LIST_FETCHED = 'Lista de estados recuperada com sucesso.'

  const { items: states, totalCount } = await stateServices.findAll()

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: STATE_LIST_FETCHED, states })
}
