import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import { voucherServices } from '../services/voucherServices'

export async function redeemOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_ACTIVATED = 'Voucher resgatado com sucesso.'

  const voucherId = req.params.id

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const voucherCode = await voucherServices.redeemOne(accessTokenData, voucherId)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_ACTIVATED, voucherCode })
}
