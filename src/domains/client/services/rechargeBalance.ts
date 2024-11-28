import { balanceDistributionSetting } from '../../../enums/balanceDistributionSetting'
import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientRechargeRepositories } from '../../clientRecharge/repositories/clientRechargeRepositories'
import { distributeRechargeAmongAllVouchers } from '../utils/distributeRechargeAmongAllVouchers'
import { distributeRechargeAmongClientCurrentVouchers } from '../utils/distributeRechargeAmongClientCurrentVouchers'
import { InternalServerError } from '../../../errors'
import { onlyUpdateClientBalance } from '../utils/onlyUpdateClientBalance'

export async function rechargeBalance (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
  switch (clientBalanceRechargeData.balanceDistributionSetting) {
    case (balanceDistributionSetting.DO_NOT_DISTRIBUTE_AMONG_VOUCHERS): {
      await onlyUpdateClientBalance(clientBalanceRechargeData)
      break
    }

    case (balanceDistributionSetting.DISTRIBUTE_EQUALLY_AMONG_ALL_VOUCHERS): {
      await distributeRechargeAmongAllVouchers(clientBalanceRechargeData)
      break
    }

    case (balanceDistributionSetting.DISTRIBUTE_EQUALLY_AMONG_CLIENT_CURRENT_VOUCHERS): {
      await distributeRechargeAmongClientCurrentVouchers(clientBalanceRechargeData)
      break
    }

    default: {
      throw new InternalServerError('Configuração de distribuição de saldo inválida.')
    }
  }

  // Registra a recarga do cliente
  await clientRechargeRepositories.createOne({
    clientId: clientBalanceRechargeData.clientId,
    amountInCents: clientBalanceRechargeData.rechargeAmountInCents
  })
}
