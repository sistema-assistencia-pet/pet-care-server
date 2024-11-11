import * as bcrypt from 'bcrypt'

import { generateAccessToken } from '../../../utils/generateAccessToken'
import type { IUserLoginResponse } from '../authInterfaces'
import { role } from '../../../enums/roleEnum'
import { UnauthorizedError } from '../../../errors'
import { userRepositories } from '../../user/repositories/userRepositories'

export async function loginUser (cpf: string, password: string): Promise<IUserLoginResponse> {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const USER_NOT_FOUND = 'Usuário não encontrado ou roleId inválido.'

  const user = await userRepositories.findOneByCpf(cpf)

  if (user === null || (user.roleId !== role.MASTER && user.roleId !== role.CLIENT_ADMIN)) {
    logger.error({ cpf }, USER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const { id, client, roleId } = user

  const accessToken = await generateAccessToken({
    id,
    clientId: client === null ? '' : client.id,
    roleId
  })

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      roleId: user.roleId,
      client: user.client
    }
  }
}
