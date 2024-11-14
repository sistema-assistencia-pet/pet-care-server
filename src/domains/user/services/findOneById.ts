import { userRepositories } from '../repositories/userRepositories'
import type { UserToBeReturned } from '../userInterfaces'
import { NotFoundError } from '../../../errors'

export async function findOneById (id: string): Promise<UserToBeReturned> {
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const user = await userRepositories.findOneById(id)

  if (user === null) throw new NotFoundError(USER_NOT_FOUND)

  return user
}
