import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { cityServices } from '../services/cityServices'
import type { CityToBeUpdated } from '../cityInterfaces'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const CITY_SUCCESSFULLY_UPDATED = 'Cidade alterada com sucesso.'

  const cityToBeUpdated: CityToBeUpdated = {
    id: parseInt(req.params.id),
    name: req.body.name
  }

  const cityId = await cityServices.updateOne(cityToBeUpdated)

  return res.status(HttpStatusCode.Ok).json({ message: CITY_SUCCESSFULLY_UPDATED, cityId })
}
