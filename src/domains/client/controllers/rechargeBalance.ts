import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'

export async function rechargeBalance (req: Request, res: Response): Promise<Response> {
  const CLIENT_BALANCE_SUCCESSFULLY_RECHARGED = 'Saldo do cliente recarregado com sucesso.'

  const clientBalanceRechargeData: ClientBalanceRechargeData = {
    clientId: req.params.id,
    rechargeAmountInCents: req.body.rechargeAmountInCents,
    balanceDistributionSetting: req.body.balanceDistributionSetting,
    waitingTimeInDays: req.body.waitingTimeInDays
  }

  await clientServices.rechargeBalance(clientBalanceRechargeData)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_BALANCE_SUCCESSFULLY_RECHARGED })
}
