import * as bcrypt from 'bcrypt'

import { UnauthorizedError } from '../../../errors'
import type { ILoginResponse } from '../interfaces'
import { role } from '../../../enums/roleEnum'
import { userRepositories } from '../../user/repositories/userRepositories'
import { generateAccessToken } from '../../../utils/generateAccessToken'

export async function loginAdmin (cpf: string, password: string): Promise<ILoginResponse> {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const user = await userRepositories.findOneByCpf(cpf)

  if (user === null || user.roleId !== role.ADMIN) {
    logger.error({ cpf }, USER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const accessToken = await generateAccessToken(user.id, user.roleId)

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      roleId: user.roleId
    }
  }
}
