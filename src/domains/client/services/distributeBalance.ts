import { balanceDistributionSetting } from '../../../enums/balanceDistributionSetting'
import type { ClientBalanceDistributionData, ClientBalanceRechargeData } from '../clientInterfaces'
import { distributeRechargeAmongAllVouchers } from '../utils/distributeRechargeAmongAllVouchers'
import { distributeRechargeAmongClientCurrentVouchers } from '../utils/distributeRechargeAmongClientCurrentVouchers'
import { BadRequestError, InternalServerError, NotFoundError } from '../../../errors'
import { clientRepositories } from '../repositories/clientRepositories'
import { status } from '../../../enums/status'
import { clientRechargeRepositories } from '../../clientRecharge/repositories/clientRechargeRepositories'

export async function distributeBalance (clientBalanceDistributionData: ClientBalanceDistributionData): Promise<void> {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'
  const CLIENT_WITHOUT_AVAILABLE_BALANCE = 'Cliente sem saldo disponível.'

  const client = await clientRepositories.findOne({ id: clientBalanceDistributionData.clientId }, false, { statusId: status.ACTIVE })

  if (client === null) throw new NotFoundError(CLIENT_NOT_FOUND)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!client.availableBalanceInCents) throw new BadRequestError(CLIENT_WITHOUT_AVAILABLE_BALANCE)

  const clientBalanceDistributionDataWithAvailableBalance: ClientBalanceRechargeData = {
    rechargeAmountInCents: client.availableBalanceInCents,
    ...clientBalanceDistributionData
  }

  // Resgata saldo do cliente (salva descréscimo)
  await clientRepositories.updateOne(
    clientBalanceDistributionData.clientId,
    { availableBalanceInCents: { decrement: client.availableBalanceInCents } }
  )

  // Registra a operaçãio de resgate de saldo do cliente
  await clientRechargeRepositories.createOne({
    clientId: clientBalanceDistributionData.clientId,
    amountInCents: -(client.availableBalanceInCents)
  })

  switch (clientBalanceDistributionData.balanceDistributionSetting) {
    case (balanceDistributionSetting.DISTRIBUTE_EQUALLY_AMONG_ALL_VOUCHERS): {
      await distributeRechargeAmongAllVouchers(clientBalanceDistributionDataWithAvailableBalance)
      break
    }

    case (balanceDistributionSetting.DISTRIBUTE_EQUALLY_AMONG_CLIENT_CURRENT_VOUCHERS): {
      await distributeRechargeAmongClientCurrentVouchers(clientBalanceDistributionDataWithAvailableBalance)
      break
    }

    default: {
      throw new InternalServerError('Configuração de distribuição de saldo inválida.')
    }
  }
}
