import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { RemoveVoucherConfigurationData } from '../clientInterfaces'
import { clientServices } from '../services/clientServices'

export async function removeVoucherConfiguration (req: Request, res: Response): Promise<Response> {
  const VOUCHER_SUCCESSFULLY_REMOVED = 'Voucher desabilitado para o cliente com sucesso.'

  const removeVoucherConfigurationData: RemoveVoucherConfigurationData = {
    clientId: req.params.id,
    voucherId: req.body.voucherId
  }

  await clientServices.removeVoucherConfiguration(removeVoucherConfigurationData)

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_SUCCESSFULLY_REMOVED })
}
