import { type NextFunction, type Request, type Response } from 'express'

import { ForbiddenError } from '../../../errors'
import { role } from '../../../enums/roleEnum'

export async function createOneAuthorization (req: Request, _res: Response, next: NextFunction): Promise<void> {
  if (
    (req.body.roleId === role.CLIENT_ADMIN) &&
    (JSON.parse(req.headers['request-user-role-id'] as string) === role.CLIENT_ADMIN) &&
    (req.body.clientId !== req.headers['request-user-client-id'] as string)
  ) throw new ForbiddenError('Operação não permitida. Usuários Admin de Cliente somente podem criar usuários para o mesmo Cliente.')

  next()
}
