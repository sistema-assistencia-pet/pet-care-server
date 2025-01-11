import type { NextFunction, Request, Response } from 'express'
import { ForbiddenError } from '../../../errors'
import { role } from '../../../enums/role'

export function findOneByIdAuthorization (req: Request, _res: Response, next: NextFunction): void {
  // Id do cliente que está sendo consultado
  const { id: clientRequestedId } = req.params

  // Id do cliente do usuário que está realizando a consulta
  const requestUserClientId = req.headers['request-user-client-id']

  // Id da role do usuário que está realizando a consulta
  const requestUserRoleId = JSON.parse(req.headers['request-user-role-id'] as string)

  // Se for um usuário admin de cliente tentando buscar um id de outro cliente, retorna erro
  if (
    (requestUserRoleId === role.CLIENT_ADMIN) &&
    (clientRequestedId !== requestUserClientId)
  ) throw new ForbiddenError()

  next()
}
