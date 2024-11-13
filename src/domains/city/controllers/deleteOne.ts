import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { cityServices } from '../services/cityServices'

export async function deleteOne (req: Request, res: Response): Promise<Response> {
  const CITY_SUCCESSFULLY_DELETED = 'Cidade excluída com sucesso.'

  const cityId: number = parseInt(req.params.id)

  await cityServices.deleteOne(cityId)

  return res.status(HttpStatusCode.Created).json({ message: CITY_SUCCESSFULLY_DELETED, cityId })
}
