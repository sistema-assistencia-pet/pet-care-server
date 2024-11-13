import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import { cityServices } from '../services/cityServices'
import type { CityToBeCreated } from '../cityInterfaces'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const CITY_SUCCESSFULLY_CREATED = 'Cidade cadastrada com sucesso.'

  const cityToBeCreated: CityToBeCreated = {
    name: req.body.name,
    stateId: req.body.stateId
  }

  const cityId = await cityServices.createOne(cityToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: CITY_SUCCESSFULLY_CREATED, cityId })
}
