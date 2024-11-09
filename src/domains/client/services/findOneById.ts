import clientRepositories from '../repositories'
import type { ClientToBeReturned } from '../interfaces'
import { NotFoundError } from '../../../errors'

export async function findOneById (id: string): Promise<ClientToBeReturned> {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  const client = await clientRepositories.findOneById(id)

  if (client === null) throw new NotFoundError(CLIENT_NOT_FOUND)

  const { updatedAt, ...clientToBeReturned } = client

  return clientToBeReturned
}
