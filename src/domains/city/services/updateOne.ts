import type { CityToBeUpdated } from '../cityInterfaces'
import { cityRepositories } from '../repositories/cityRepositories'

export async function updateOne (cityToBeUpdated: CityToBeUpdated): Promise<number> {
  const { id } = await cityRepositories.updateOne(cityToBeUpdated)

  return id
}
