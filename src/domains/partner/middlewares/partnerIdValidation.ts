import { type NextFunction, type Request, type Response } from 'express'

import { NotFoundError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'

export async function partnerIdValidation (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  const partner = await partnerRepositories.findOne({ id: req.params.id }, false)

  if (partner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  next()
}
