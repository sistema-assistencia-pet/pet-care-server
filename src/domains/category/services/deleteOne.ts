import { categoryRepositories } from '../repositories/categoryRepositories'

export async function deleteOne (categoryId: number): Promise<number> {
  const { id } = await categoryRepositories.deleteOne(categoryId)

  return id
}
