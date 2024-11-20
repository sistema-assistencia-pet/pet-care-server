import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import type { VoucherToBeCreated } from '../voucherInterfaces'
import { voucherServices } from '../services/voucherServices'

export async function createOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_CREATED = 'Voucher cadastrado com sucesso.'

  const voucherToBeCreated: VoucherToBeCreated = {
    title: req.body.title,
    description: req.body.description,
    rules: req.body.rules,
    partnerId: req.body.partnerId,
    value: req.body.value
  }

  const voucherId = await voucherServices.createOne(voucherToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: VOUCHER_SUCCESSFULLY_CREATED, voucherId })
}
