import type { CategoryToBeCreated } from '../categoryInterfaces'
import { categoryRepositories } from '../repositories/categoryRepositories'

export async function createOne (categoryToBeCreated: CategoryToBeCreated): Promise<number> {
  const { id } = await categoryRepositories.createOne(categoryToBeCreated)

  return id
}
