import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientRepositories } from '../repositories/clientRepositories'

export async function onlyUpdateClientBalance (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
  await clientRepositories.updateOne(
    clientBalanceRechargeData.clientId,
    { availableBalanceInCents: { increment: clientBalanceRechargeData.rechargeAmountInCents } }
  )
}
