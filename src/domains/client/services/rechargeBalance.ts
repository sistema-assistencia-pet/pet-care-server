import { balanceDistributionSetting } from '../../../enums/balanceDistributionSetting'
import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientBalanceTransactionRepositories } from '../../clientBalanceTransaction/repositories/clientBalanceTransactionRepositories'
import { clientBalanceTransactionType } from '../../../enums/clientBalanceTransactionType'
import { clientRepositories } from '../repositories/clientRepositories'
import { distributeRechargeAmongAllVouchers } from '../utils/distributeRechargeAmongAllVouchers'
import { distributeRechargeAmongClientCurrentVouchers } from '../utils/distributeRechargeAmongClientCurrentVouchers'
import { InternalServerError } from '../../../errors'
import { onlyUpdateClientBalance } from '../utils/onlyUpdateClientBalance'

export async function rechargeBalance (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
  // Recarrega saldo do cliente (salva acrescimo)
  await clientRepositories.updateOne(
    clientBalanceRechargeData.clientId,
    { availableBalanceInCents: { increment: clientBalanceRechargeData.rechargeAmountInCents } }
  )

  // Registra a operação de recarga do saldo do cliente
  await clientBalanceTransactionRepositories.createOne({
    clientId: clientBalanceRechargeData.clientId,
    amountInCents: clientBalanceRechargeData.rechargeAmountInCents,
    type: clientBalanceTransactionType.RECHARGE
  })

  // Resgata saldo do cliente (salva descréscimo)
  await clientRepositories.updateOne(
    clientBalanceRechargeData.clientId,
    { availableBalanceInCents: { decrement: clientBalanceRechargeData.rechargeAmountInCents } }
  )

  // Registra a operação de consumo do saldo do cliente
  await clientBalanceTransactionRepositories.createOne({
    clientId: clientBalanceRechargeData.clientId,
    amountInCents: -(clientBalanceRechargeData.rechargeAmountInCents),
    type: clientBalanceTransactionType.USAGE
  })

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
}
