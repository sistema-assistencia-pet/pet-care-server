import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientRepositories } from '../repositories/clientRepositories'
import { InternalServerError } from '../../../errors'
import { status } from '../../../enums/status'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import { waitingTimeInDays } from '../../../enums/waitingTimeInDays'

export async function distributeRechargeAmongAllVouchers (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
  try {
    const allVouchers = await voucherRepositories.findMany({ where: { statusId: status.ACTIVE } })

    if (allVouchers.length === 0) return

    // Calcula o valor de recarga por voucher
    const rechargeAmountPerVoucher = Math.trunc(clientBalanceRechargeData.rechargeAmountInCents / allVouchers.length)

    // Cria a relação cliente/voucher/saldo/tempo de espera para cada voucher ativo do sistema
    for (const voucher of allVouchers) {
      await voucherSettingsByClientRepositories.upsertOne({
        clientId: clientBalanceRechargeData.clientId,
        voucherId: voucher.id,
        reservedBalanceInCents: rechargeAmountPerVoucher,
        watingTimeInDays: clientBalanceRechargeData.watingTimeInDays ?? waitingTimeInDays.DEFAULT
      })
    }

    // Calcula o resto da divisão do valor de recarga pelo número de vouchers
    const rechargeAmountRemainder = clientBalanceRechargeData.rechargeAmountInCents % allVouchers.length

    // Se houver resto na divisão, adiciona o resto ao saldo do cliente
    if (rechargeAmountRemainder > 0) {
      await clientRepositories.updateOne(
        clientBalanceRechargeData.clientId,
        { availableBalanceInCents: { increment: rechargeAmountRemainder } }
      )
    }
  } catch (error) {
    logger.error(error)
    throw new InternalServerError()
  }
}
