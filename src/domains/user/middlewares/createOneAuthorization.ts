import { type NextFunction, type Request, type Response } from 'express'

import { ForbiddenError } from '../../../errors'
import { role } from '../../../enums/roleEnum'

function checkIfIsCreatingMaster (userToBeCreatedRoleId: number): void {
  if (userToBeCreatedRoleId === role.MASTER) throw new ForbiddenError('Usuários de cliente não podem criar usuários master.')
}

function checkIfIsSameClientId (requestUserClientId: string, userToBeCreatedClientId: string): void {
  if (requestUserClientId !== userToBeCreatedClientId) {
    throw new ForbiddenError('Operação não permitida. Usuários Admin de Cliente somente podem criar usuários para o mesmo Cliente.')
  }
}

export async function createOneAuthorization (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const requestUserClientId = req.headers['request-user-client-id'] as string
  const requestUserRoleId = JSON.parse(req.headers['request-user-role-id'] as string)
  const userToBeCreatedClientId = req.body.clientId as string
  const userToBeCreatedRoleId = req.body.roleId as number

  if (requestUserRoleId === role.CLIENT_ADMIN) {
    checkIfIsCreatingMaster(userToBeCreatedRoleId)
    checkIfIsSameClientId(requestUserClientId, userToBeCreatedClientId)
  }

  next()
}
