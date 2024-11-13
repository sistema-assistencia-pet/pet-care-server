import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { categoryServices } from '../services/categoryServices'
import type { CategoryToBeCreated } from '../categoryInterfaces'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const CATEGORY_SUCCESSFULLY_CREATED = 'Categoria cadastrada com sucesso.'

  const categoryToBeCreated: CategoryToBeCreated = {
    name: req.body.name
  }

  const categoryId = await categoryServices.createOne(categoryToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: CATEGORY_SUCCESSFULLY_CREATED, categoryId })
}
