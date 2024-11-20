import type { NextFunction, Request, Response } from 'express'

import { ForbiddenError, NotFoundError } from '../../../errors'
import { role } from '../../../enums/role'
import { memberRepositories } from '../repositories/memberRepositories'

export async function checkIfIsSameClientId (req: Request, _res: Response, next: NextFunction): Promise<void> {
  if (parseInt(req.headers['request-user-role-id'] as string) === role.CLIENT_ADMIN) {
    let clientId = req.body.clientId as string | undefined

    if (clientId === undefined) {
      const client = await memberRepositories.findOne({ id: req.params.id }, false)

      if (client === null) throw new NotFoundError('Associado não encontrado.')

      clientId = client.client.id
    }

    if (clientId !== req.headers['request-user-client-id'] as string) {
      throw new ForbiddenError('Operação não permitida. Usuários Admin de Cliente somente podem criar associados para o mesmo Cliente.')
    }
  }

  next()
}
