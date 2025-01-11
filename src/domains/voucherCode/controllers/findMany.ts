/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { FindManyVoucherCodesQueryParams } from '../voucherCodeInterfaces'
import { voucherCodeServices } from '../services/voucherCodeServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const VOUCHER_CODES_FOUND = 'Códigos de voucher recuperados com sucesso.'

  let wasRedeemed: any
  if (req.query['was-redeemed'] === 'true') wasRedeemed = true
  if (req.query['was-redeemed'] === 'false') wasRedeemed = false

  const queryParams: FindManyVoucherCodesQueryParams = {
    voucherId: req.query['voucher-id'] as string,
    wasRedeemed
  }

  const { items: voucherCodes, totalCount } = await voucherCodeServices.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_CODES_FOUND, voucherCodes })
}
