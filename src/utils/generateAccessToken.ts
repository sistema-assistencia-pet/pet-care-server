import { createSecretKey } from 'node:crypto'
import { SignJWT } from 'jose'

import { getEnvironmentVariable } from './getEnvironmentVariable'

export async function generateAccessToken (id: string, roleId: number): Promise<string> {
  const JWT_SECRET = getEnvironmentVariable('JWT_SECRET')
  const JWT_ISSUER = getEnvironmentVariable('JWT_ISSUER')
  const JWT_AUDIENCE = getEnvironmentVariable('JWT_AUDIENCE')

  const secretKey = createSecretKey(JWT_SECRET, 'utf8')

  const accessToken = await new SignJWT({ id, roleId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('240m')
    .sign(secretKey)

  return accessToken
}
