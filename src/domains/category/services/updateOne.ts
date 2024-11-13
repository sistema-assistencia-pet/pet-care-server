import type { CategoryToBeUpdated } from '../categoryInterfaces'
import { categoryRepositories } from '../repositories/categoryRepositories'

export async function updateOne (categoryToBeUpdated: CategoryToBeUpdated): Promise<number> {
  const { id } = await categoryRepositories.updateOne(categoryToBeUpdated)

  return id
}
