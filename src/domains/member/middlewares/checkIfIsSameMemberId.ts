import type { NextFunction, Request, Response } from 'express'

import { ForbiddenError } from '../../../errors'
import { role } from '../../../enums/role'

export async function checkIfIsSameMemberId (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const requestUserId = req.headers['request-user-id'] as string
  const requestUserRoleId = parseInt(req.headers['request-user-role-id'] as string)

  if (requestUserRoleId === role.MEMBER && requestUserId !== req.params.id) throw new ForbiddenError()

  next()
}
