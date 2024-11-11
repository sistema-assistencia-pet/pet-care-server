import { createSecretKey } from 'node:crypto'
import { SignJWT } from 'jose'

import { getEnvironmentVariable } from './getEnvironmentVariable'
import type { AccessTokenData } from '../interfaces'

export async function generateAccessToken (accessTokenData: AccessTokenData): Promise<string> {
  const JWT_SECRET = getEnvironmentVariable('JWT_SECRET')
  const JWT_ISSUER = getEnvironmentVariable('JWT_ISSUER')
  const JWT_AUDIENCE = getEnvironmentVariable('JWT_AUDIENCE')

  const secretKey = createSecretKey(JWT_SECRET, 'utf8')

  const { id, clientId, roleId } = accessTokenData

  const accessToken = await new SignJWT({ id, clientId, roleId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('240m')
    .sign(secretKey)

  return accessToken
}
