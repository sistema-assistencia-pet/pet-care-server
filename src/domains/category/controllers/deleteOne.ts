import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { categoryServices } from '../services/categoryServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const CATEGORY_SUCCESSFULLY_DELETED = 'Categoria excluída com sucesso.'

  const categoryId: number = parseInt(req.params.id)

  await categoryServices.deleteOne(categoryId)

  return res.status(HttpStatusCode.Created).json({ message: CATEGORY_SUCCESSFULLY_DELETED, categoryId })
}
