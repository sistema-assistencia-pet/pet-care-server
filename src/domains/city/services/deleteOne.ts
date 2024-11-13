import { cityRepositories } from '../repositories/cityRepositories'

export async function deleteOne (cityId: number): Promise<number> {
  const { id } = await cityRepositories.deleteOne(cityId)

  return id
}
