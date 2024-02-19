import * as bcrypt from 'bcrypt'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'

import { ILoginResponse } from './interfaces'
import { getEnvironmentVariable } from '../../utils/getEnvironmentVariable'
import { UnauthorizedError } from '../../errors'
import userRepositories from '../user/repositories'

const generateAccessToken = async (id: string): Promise<string> => {
  const JWT_SECRET = getEnvironmentVariable('JWT_SECRET')
  const JWT_ISSUER = getEnvironmentVariable('JWT_ISSUER')
  const JWT_AUDIENCE = getEnvironmentVariable('JWT_AUDIENCE')

  const secretKey = createSecretKey(JWT_SECRET, 'utf8')

  const accessToken = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('120m')
    .sign(secretKey)

  return accessToken
}

const login = async (cpf: string, password: string): Promise<ILoginResponse> => {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const USER_NOT_FOUND = 'Usuário não encontrado.'

  const user = await userRepositories.findOneByCpf(cpf)

  if (user === null) {
    logger.error({ cpf }, USER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const accessToken = await generateAccessToken(user.id)

  return { 
    accessToken,
    user: {
      id: user.id,
      name: user.name
    }
  }
}

export default { login }
