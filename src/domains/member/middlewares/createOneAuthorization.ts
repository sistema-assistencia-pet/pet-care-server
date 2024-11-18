import type { NextFunction, Request, Response } from 'express'

import { ForbiddenError } from '../../../errors'
import { role } from '../../../enums/role'

export async function createOneAuthorization (req: Request, _res: Response, next: NextFunction): Promise<void> {
  if (
    (JSON.parse(req.headers['request-user-role-id'] as string) === role.CLIENT_ADMIN) &&
    (req.body.clientId !== req.headers['request-user-client-id'] as string)
  ) throw new ForbiddenError('Operação não permitida. Usuários Admin de Cliente somente podem criar associados para o mesmo Cliente.')

  next()
}
