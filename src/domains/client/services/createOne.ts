import clientRepositories from '../repositories'
import type { ClientToBeCreated } from '../interfaces'

export async function createOne (clientToBeCreated: ClientToBeCreated): Promise<string> {
  const { id } = await clientRepositories.createOne(clientToBeCreated)

  return id
}
