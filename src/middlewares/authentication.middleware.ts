import { createSecretKey } from 'node:crypto'
import { jwtVerify } from 'jose'
import { type NextFunction, type Request, type Response } from 'express'

import { getEnvironmentVariable } from '../utils/getEnvironmentVariable'
import { UnauthorizedError } from '../errors'

export const verifyAccessToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const INVALID_ACCESS_TOKEN = 'Token de acesso inválido.'

  const EXCLUSIVEPASS_JWT_SECRET = getEnvironmentVariable('EXCLUSIVEPASS_JWT_SECRET')
  const EXCLUSIVEPASS_JWT_ISSUER = getEnvironmentVariable('EXCLUSIVEPASS_JWT_ISSUER')
  const EXCLUSIVEPASS_JWT_AUDIENCE = getEnvironmentVariable('EXCLUSIVEPASS_JWT_AUDIENCE')

  const accessToken = req.headers.authorization?.split('Bearer ')[1]

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!accessToken) throw new UnauthorizedError(INVALID_ACCESS_TOKEN)

  const secretKey = createSecretKey(EXCLUSIVEPASS_JWT_SECRET, 'utf8')

  try {
    const { payload } = await jwtVerify(accessToken, secretKey, {
      issuer: EXCLUSIVEPASS_JWT_ISSUER,
      audience: EXCLUSIVEPASS_JWT_AUDIENCE
    })

    if (
      !('id' in payload) ||
      (typeof payload.id !== 'string')
    ) throw new UnauthorizedError(INVALID_ACCESS_TOKEN)

    if (
      !('clientId' in payload) ||
      (typeof payload.clientId !== 'string')
    ) throw new UnauthorizedError(INVALID_ACCESS_TOKEN)

    if (
      !('roleId' in payload) ||
      (typeof payload.roleId !== 'number')
    ) throw new UnauthorizedError(INVALID_ACCESS_TOKEN)

    req.headers['request-user-id'] = payload.id
    req.headers['request-user-client-id'] = payload.clientId
    req.headers['request-user-role-id'] = JSON.stringify(payload.roleId)

    next()
  } catch (error) {
    throw new UnauthorizedError(INVALID_ACCESS_TOKEN)
  }
}
