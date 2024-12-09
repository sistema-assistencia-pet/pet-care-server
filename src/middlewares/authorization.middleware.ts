import { type NextFunction, type Request, type Response } from 'express'

import { ForbiddenError } from '../errors'
import { role } from '../enums/role'

// Verifica se é usuário MASTER
export async function checkIfIsMaster (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)

  if (!isMaster) throw new ForbiddenError()

  next()
}

// Verifica se é um usuário de sistema (MASTER ou CLIENT_ADMIN)
export async function checkIfIsMasterOrClient (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)
  const isClientAdmin = req.headers['request-user-role-id'] === JSON.stringify(role.CLIENT_ADMIN)

  if (!isMaster && !isClientAdmin) throw new ForbiddenError()

  next()
}

// Verifica se é um usuário de sistema ou associado (MASTER ou CLIENT_ADMIN ou MEMBER)
// Middleware criado para o endpoint que um token de partner não deve poder acessar
export async function checkIfIsMasterOrClientOrMember (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)
  const isClientAdmin = req.headers['request-user-role-id'] === JSON.stringify(role.CLIENT_ADMIN)
  const isMember = req.headers['request-user-role-id'] === JSON.stringify(role.MEMBER)

  if (!isMaster && !isClientAdmin && !isMember) throw new ForbiddenError()

  next()
}

// Verifica se é um usuário de sistema ou estabelecimento (MASTER ou CLIENT_ADMIN ou PARTNER_ADMIN)
// Middleware criado para o endpoint de validação de voucher
export async function checkIfIsMasterOrClientOrPartner (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MASTER)
  const isClientAdmin = req.headers['request-user-role-id'] === JSON.stringify(role.CLIENT_ADMIN)
  const isPartnerAdmin = req.headers['request-user-role-id'] === JSON.stringify(role.PARTNER_ADMIN)

  if (!isMaster && !isClientAdmin && !isPartnerAdmin) throw new ForbiddenError()

  next()
}

// Verifica se é usuário associado (MEMBER)
// Middleware criado para o endpoint de resgate de voucher
export async function checkIfIsMember (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const isMaster = req.headers['request-user-role-id'] === JSON.stringify(role.MEMBER)

  if (!isMaster) throw new ForbiddenError()

  next()
}
