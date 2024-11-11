import clientRepositories from '../repositories'
import type { ClientToBeCreated } from '../clientInterfaces'

export async function createOne (clientToBeCreated: ClientToBeCreated): Promise<string> {
  const { id } = await clientRepositories.createOne(clientToBeCreated)

  return id
}
