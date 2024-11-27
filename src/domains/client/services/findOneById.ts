import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeReturned } from '../clientInterfaces'
import { NotFoundError } from '../../../errors'

export async function findOneById (id: string): Promise<ClientToBeReturned> {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  const client = await clientRepositories.findOne({ id }, true)

  if (client === null) throw new NotFoundError(CLIENT_NOT_FOUND)

  return client
}
