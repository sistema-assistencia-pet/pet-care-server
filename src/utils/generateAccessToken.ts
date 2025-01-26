import { createSecretKey } from 'node:crypto'
import { SignJWT } from 'jose'

import { getEnvironmentVariable } from './getEnvironmentVariable'
import type { AccessTokenData } from '../interfaces'

export async function generateAccessToken (accessTokenData: AccessTokenData): Promise<string> {
  const GIFT2ME_JWT_SECRET = getEnvironmentVariable('GIFT2ME_JWT_SECRET')
  const GIFT2ME_JWT_ISSUER = getEnvironmentVariable('GIFT2ME_JWT_ISSUER')
  const GIFT2ME_JWT_AUDIENCE = getEnvironmentVariable('GIFT2ME_JWT_AUDIENCE')

  const secretKey = createSecretKey(GIFT2ME_JWT_SECRET, 'utf8')

  const { id, clientId, roleId } = accessTokenData

  const accessToken = await new SignJWT({ id, clientId, roleId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(GIFT2ME_JWT_ISSUER)
    .setAudience(GIFT2ME_JWT_AUDIENCE)
    .setExpirationTime('240m')
    .sign(secretKey)

  return accessToken
}
