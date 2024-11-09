import clientRepositories from '../repositories'
import type { ClientToBeUpdated } from '../interfaces'

export async function updateOne (id: string, clientToBeUpdated: Partial<ClientToBeUpdated>): Promise<void> {
  await clientRepositories.updateOne(id, clientToBeUpdated)
}
