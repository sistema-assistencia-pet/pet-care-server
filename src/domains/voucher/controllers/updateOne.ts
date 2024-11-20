import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import type { VoucherToBeUpdated } from '../voucherInterfaces'
import { voucherServices } from '../services/voucherServices'

export async function updateOne (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_CREATED = 'Voucher atualizado com sucesso.'

  const voucherId = req.params.id

  const voucherToBeUpdated: VoucherToBeUpdated = {
    title: req.body.title,
    description: req.body.description,
    rules: req.body.rules,
    value: req.body.value
  }

  const voucherIdReturned = await voucherServices.updateOne(voucherId, voucherToBeUpdated)

  return res.status(HttpStatusCode.Created).json({ message: VOUCHER_SUCCESSFULLY_CREATED, voucherId: voucherIdReturned })
}
