import { createSecretKey } from 'node:crypto'
import { SignJWT } from 'jose'

import { getEnvironmentVariable } from './getEnvironmentVariable'
import type { AccessTokenData } from '../interfaces'

export async function generateAccessToken (accessTokenData: AccessTokenData): Promise<string> {
  const PET_CARE_JWT_SECRET = getEnvironmentVariable('PET_CARE_JWT_SECRET')
  const PET_CARE_JWT_ISSUER = getEnvironmentVariable('PET_CARE_JWT_ISSUER')
  const PET_CARE_JWT_AUDIENCE = getEnvironmentVariable('PET_CARE_JWT_AUDIENCE')

  const secretKey = createSecretKey(PET_CARE_JWT_SECRET, 'utf8')

  const { id, clientId, roleId } = accessTokenData

  const accessToken = await new SignJWT({ id, clientId, roleId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(PET_CARE_JWT_ISSUER)
    .setAudience(PET_CARE_JWT_AUDIENCE)
    .setExpirationTime('240m')
    .sign(secretKey)

  return accessToken
}
