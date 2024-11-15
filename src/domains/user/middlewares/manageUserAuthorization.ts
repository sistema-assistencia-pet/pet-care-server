import { type NextFunction, type Request, type Response } from 'express'

import { ForbiddenError, NotFoundError } from '../../../errors'
import { role } from '../../../enums/roleEnum'
import { userRepositories } from '../repositories/userRepositories'

function checkIfIsCreatingMaster (userToBeManagedRoleId: number): void {
  if (userToBeManagedRoleId === role.MASTER) throw new ForbiddenError('Usuários de cliente não podem gerenciar usuários master.')
}

function checkIfIsSameClientId (requestUserClientId: string, userToBeManagedClientId: string): void {
  if (requestUserClientId !== userToBeManagedClientId) {
    throw new ForbiddenError('Operação não permitida. Usuários Admin de Cliente somente podem gerenciar usuários para o mesmo Cliente.')
  }
}

export async function manageUserAuthorization (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const requestUserClientId = req.headers['request-user-client-id'] as string
  const requestUserRoleId = JSON.parse(req.headers['request-user-role-id'] as string)
  let userToBeManagedClientId = req.body.clientId as string
  let userToBeManagedRoleId = req.body.roleId as number

  if (requestUserRoleId === role.CLIENT_ADMIN) {
    if (userToBeManagedClientId === undefined || userToBeManagedRoleId === undefined) {
      const user = await userRepositories.findOneById({ id: req.params.id })

      if (user === null) throw new NotFoundError('Usuário não encontrado.')
      if (user.client === null) throw new ForbiddenError('Usuários de cliente não podem gerenciar usuários master.') // client somente é null para usuários master

      userToBeManagedClientId = user.client.id
      userToBeManagedRoleId = user.role.id
    }

    checkIfIsCreatingMaster(userToBeManagedRoleId)
    checkIfIsSameClientId(requestUserClientId, userToBeManagedClientId)
  }

  next()
}
