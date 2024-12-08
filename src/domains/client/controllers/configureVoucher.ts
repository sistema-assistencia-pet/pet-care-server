import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ConfigureVoucherData } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'
import { voucherBalanceOperationType } from '../../../enums/voucherBalanceOperationType'

export async function configureVoucher (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_CONFIGURED = 'Voucher configurado com sucesso.'

  const configureVoucherData: ConfigureVoucherData = {
    clientId: req.params.id,
    voucherId: req.body.voucherId,
    rechargeAmountInCents: Math.abs(req.body.rechargeAmountInCents as number),
    waitingTimeInHours: req.body.waitingTimeInHours,
    voucherBalanceOperationType: (req.body.rechargeAmountInCents > 0)
      ? voucherBalanceOperationType.ALLOCATE
      : voucherBalanceOperationType.DEALLOCATE
  }

  await clientServices.configureVoucher(configureVoucherData)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_CONFIGURED })
}
