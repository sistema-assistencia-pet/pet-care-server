import { type NextFunction, type Request, type Response } from 'express'

import { ForbiddenError } from '../errors'
import { role } from '../enums/roleEnum'

// Verifica se é usuário MASTER
const checkIfIsMasterUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)

  if (!isMaster) throw new ForbiddenError()

  next()
}

// Verifica se é um usuário de sistema (MASTER ou CLIENT_ADMIN)
const checkIfIsSystemUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)
  const isClientAdmin = req.headers['request-user-role-id'] === JSON.stringify(role.CLIENT_ADMIN)

  if (!isMaster && !isClientAdmin) throw new ForbiddenError()

  next()
}

// Middleware desenvolvido especificamente para o endpoint de detalhes de um associado,
// que será consumido por usuários (admin) e associados (member)
const checkIfIsAnyUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const isMember = req.headers['request-user-role-id'] === JSON.stringify(role.MEMBER)
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)
  const isClientAdmin = req.headers['request-user-role-id'] === JSON.stringify(role.CLIENT_ADMIN)

  if (!isMember && !isMaster && !isClientAdmin) throw new ForbiddenError()

  next() // TODO: Endpoint deverá conferir a role
}

export { checkIfIsMasterUser, checkIfIsSystemUser, checkIfIsAnyUser }
