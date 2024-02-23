import clientRepositories from './repositories'
import { ClientToBeCreated } from './interfaces'

const createOne = async (clientToBeCreated: ClientToBeCreated): Promise<string> => {
  const { id } = await clientRepositories.createOne(clientToBeCreated)

  return id
}

export default {
  createOne
}
