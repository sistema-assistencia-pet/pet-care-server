import { createSecretKey } from 'node:crypto'
import { SignJWT } from 'jose'

import { getEnvironmentVariable } from './getEnvironmentVariable'
import type { AccessTokenData } from '../interfaces'

export async function generateAccessToken (accessTokenData: AccessTokenData): Promise<string> {
  const EXCLUSIVEPASS_JWT_SECRET = getEnvironmentVariable('EXCLUSIVEPASS_JWT_SECRET')
  const EXCLUSIVEPASS_JWT_ISSUER = getEnvironmentVariable('EXCLUSIVEPASS_JWT_ISSUER')
  const EXCLUSIVEPASS_JWT_AUDIENCE = getEnvironmentVariable('EXCLUSIVEPASS_JWT_AUDIENCE')

  const secretKey = createSecretKey(EXCLUSIVEPASS_JWT_SECRET, 'utf8')

  const { id, clientId, roleId } = accessTokenData

  const accessToken = await new SignJWT({ id, clientId, roleId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(EXCLUSIVEPASS_JWT_ISSUER)
    .setAudience(EXCLUSIVEPASS_JWT_AUDIENCE)
    .setExpirationTime('240m')
    .sign(secretKey)

  return accessToken
}
