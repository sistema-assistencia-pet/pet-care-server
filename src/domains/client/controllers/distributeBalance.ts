import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { ClientBalanceDistributionData } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'

export async function distributeBalance (req: Request, res: Response): Promise<Response> {
  const CLIENT_BALANCE_SUCCESSFULLY_DISTRIBUTED = 'Saldo do cliente distribuído com sucesso.'

  const clientBalanceDistributionData: ClientBalanceDistributionData = {
    clientId: req.params.id,
    balanceDistributionSetting: req.body.balanceDistributionSetting,
    watingTimeInDays: req.body.watingTimeInDays
  }

  await clientServices.distributeBalance(clientBalanceDistributionData)

  return res.status(HttpStatusCode.Ok).json({ message: CLIENT_BALANCE_SUCCESSFULLY_DISTRIBUTED })
}
