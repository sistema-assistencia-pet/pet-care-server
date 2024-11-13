import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { categoryServices } from '../services/categoryServices'
import type { CategoryToBeUpdated } from '../categoryInterfaces'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const CATEGORY_SUCCESSFULLY_UPDATED = 'Categoria alterada com sucesso.'

  const categoryToBeUpdated: CategoryToBeUpdated = {
    id: parseInt(req.params.id),
    name: req.body.name
  }

  const categoryId = await categoryServices.updateOne(categoryToBeUpdated)

  return res.status(HttpStatusCode.Created).json({ message: CATEGORY_SUCCESSFULLY_UPDATED, categoryId })
}
