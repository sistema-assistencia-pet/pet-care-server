import { BadRequestError } from '../../../errors'
import { clientBalanceTransactionRepositories } from '../../clientBalanceTransaction/repositories/clientBalanceTransactionRepositories'
import { clientBalanceTransactionType } from '../../../enums/clientBalanceTransactionType'
import { clientRepositories } from '../repositories/clientRepositories'
import type { RemoveVoucherConfigurationData } from '../clientInterfaces'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'

export async function removeVoucherConfiguration (removeVoucherConfigurationData: RemoveVoucherConfigurationData): Promise<void> {
  const CLIENT_VOUCHER_SETTINGS_NOT_FOUND = 'Configurações do voucher para este cliente não encontrada.'

  const voucherSettingsByClientList = await voucherSettingsByClientRepositories.findMany({
    where: {
      clientId: removeVoucherConfigurationData.clientId,
      voucherId: removeVoucherConfigurationData.voucherId
    }
  })
  if (voucherSettingsByClientList.length === 0) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_NOT_FOUND)

  const reservedBalanceInCents = voucherSettingsByClientList[0].reservedBalanceInCents

  // Devolve saldo ao cliente (vindo do voucher)
  await clientRepositories.updateOne(
    removeVoucherConfigurationData.clientId,
    { availableBalanceInCents: { increment: reservedBalanceInCents } }
  )

  // Registra a operação de devolução do saldo do cliente vindo do voucher
  await clientBalanceTransactionRepositories.createOne({
    clientId: removeVoucherConfigurationData.clientId,
    amountInCents: reservedBalanceInCents,
    type: clientBalanceTransactionType.DISABLED_VOUCHER_REFUND
  })

  // Remove a configuração do voucher para o cliente
  await voucherSettingsByClientRepositories.deleteOne(
    removeVoucherConfigurationData.clientId,
    removeVoucherConfigurationData.voucherId
  )
}
