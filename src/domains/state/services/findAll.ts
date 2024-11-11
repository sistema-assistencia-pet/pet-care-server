import type { State } from '@prisma/client'

import type { FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import { stateRepositories } from '../repositories/stateRepositories'

export async function findAll (): Promise<FindManyResponse<State>> {
  const STATE_LIST_NOT_FOUND = 'Nenhum estado encontrado.'

  const states = await stateRepositories.findAll()

  if (states.length === 0) throw new NotFoundError(STATE_LIST_NOT_FOUND)

  return { items: states, totalCount: states.length }
}
