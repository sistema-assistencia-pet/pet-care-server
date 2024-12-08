import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import type { ValidateVoucherCodeData } from '../voucherCodeInterfaces'
import { voucherCodeServices } from '../services/voucherCodeServices'

export async function validateOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_ACTIVATED = 'Código de voucher validado com sucesso.'

  const validateVoucherCodeData: ValidateVoucherCodeData = {
    code: req.body.code,
    memberCpf: req.body.memberCpf
  }

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  await voucherCodeServices.validateOne(accessTokenData, validateVoucherCodeData)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_ACTIVATED })
}
