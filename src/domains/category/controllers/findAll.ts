import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { categoryServices } from '../services/categoryServices'

export async function findAll (_req: Request, res: Response): Promise<Response> {
  const CATEGORIES_LIST_FETCHED = 'Lista de categorias recuperada com sucesso.'

  const { items: categories, totalCount } = await categoryServices.findAll()

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: CATEGORIES_LIST_FETCHED, categories })
}
