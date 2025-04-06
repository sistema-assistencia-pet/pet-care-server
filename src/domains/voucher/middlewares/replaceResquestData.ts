import { type NextFunction, type Request, type Response } from 'express'

import { BadRequestError } from '../../../errors'
import { userRepositories } from '../../user/repositories/userRepositories'
import { clientRepositories } from '../../client/repositories/clientRepositories'
import { MASTER_CLIENT_CNPJ } from '../../../apiConfig'

export async function replaceResquestData (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const cpf = req.body.cpf as string

  const voucherUser = await userRepositories.findOne({ cpf })
  if (voucherUser === null) throw new BadRequestError('Usuário não encontrado.')
  req.headers['request-user-id'] = voucherUser.id

  const masterClient = await clientRepositories.findOne({ cnpj: MASTER_CLIENT_CNPJ }, false)
  if (masterClient === null) throw new BadRequestError('Cliente não encontrado.')
  req.headers['request-user-client-id'] = masterClient.id

  next()
}
