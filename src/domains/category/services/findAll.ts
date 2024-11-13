import type { State } from '@prisma/client'

import { categoryRepositories } from '../repositories/categoryRepositories'
import type { FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'

export async function findAll (): Promise<FindManyResponse<State>> {
  const CATEGORIES_LIST_NOT_FOUND = 'Nenhuma cidade encontrada.'

  const categories = await categoryRepositories.findAll()

  if (categories.length === 0) throw new NotFoundError(CATEGORIES_LIST_NOT_FOUND)

  return { items: categories, totalCount: categories.length }
}
