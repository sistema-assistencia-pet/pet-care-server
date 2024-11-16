import type { AccessTokenData } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import type { Prisma } from '@prisma/client'
import { userRepositories } from '../repositories/userRepositories'
import type { UserToBeReturned } from '../userInterfaces'
import { role } from '../../../enums/roleEnum'

export async function findOneById (accessTokenData: AccessTokenData, id: string): Promise<Omit<UserToBeReturned, 'password'>> {
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const where: Prisma.UserWhereInput = {}

  if (accessTokenData.roleId === role.CLIENT_ADMIN) Object.assign(where, { clientId: accessTokenData.clientId })

  const user = await userRepositories.findOne({ id }, where)

  if (user === null) throw new NotFoundError(USER_NOT_FOUND)

  const { password, ...userWithoutPassword } = user

  return userWithoutPassword
}
