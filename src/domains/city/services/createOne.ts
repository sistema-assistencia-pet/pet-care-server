import type { CityToBeCreated } from '../cityInterfaces'
import { cityRepositories } from '../repositories/cityRepositories'

export async function createOne (cityToBeCreated: CityToBeCreated): Promise<number> {
  const { id } = await cityRepositories.createOne(cityToBeCreated)

  return id
}
