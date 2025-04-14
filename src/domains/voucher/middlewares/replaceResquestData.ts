import { type NextFunction, type Request, type Response } from 'express'

import { BadRequestError } from '../../../errors'
import { clientRepositories } from '../../client/repositories/clientRepositories'
import { MASTER_CLIENT_CNPJ } from '../../../apiConfig'
import { memberRepositories } from '../../member/repositories/memberRepositories'

export async function replaceResquestData (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const cpf = req.body.cpf as string

  const voucherMember = await memberRepositories.findOne({ cpf }, false)
  if (voucherMember === null) throw new BadRequestError('Associado não encontrado.')
  req.headers['request-user-id'] = voucherMember.id

  const masterClient = await clientRepositories.findOne({ cnpj: MASTER_CLIENT_CNPJ }, false)
  if (masterClient === null) throw new BadRequestError('Cliente não encontrado.')
  req.headers['request-user-client-id'] = masterClient.id

  next()
}
