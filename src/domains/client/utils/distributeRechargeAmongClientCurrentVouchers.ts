import { BadRequestError, InternalServerError } from '../../../errors'
import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientBalanceTransactionRepositories } from '../../clientBalanceTransaction/repositories/clientBalanceTransactionRepositories'
import { clientBalanceTransactionType } from '../../../enums/clientBalanceTransactionType'
import { clientRepositories } from '../repositories/clientRepositories'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import { waitingTimeInDays } from '../../../enums/waitingTimeInDays'

export async function distributeRechargeAmongClientCurrentVouchers (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
  try {
    const clientCurrentVouchers = await voucherSettingsByClientRepositories.findMany({ clientId: clientBalanceRechargeData.clientId })

    if (clientCurrentVouchers.length === 0) throw new BadRequestError('O cliente não possui vouchers configurados.')

    // Calcula o valor de recarga por voucher
    const rechargeAmountPerVoucher = Math.trunc(clientBalanceRechargeData.rechargeAmountInCents / clientCurrentVouchers.length)

    // Cria a relação cliente/voucher/saldo/tempo de espera para cada voucher ativo do sistema
    for (const voucher of clientCurrentVouchers) {
      await voucherSettingsByClientRepositories.upsertOne({
        clientId: clientBalanceRechargeData.clientId,
        voucherId: voucher.voucherId,
        reservedBalanceInCents: rechargeAmountPerVoucher,
        watingTimeInDays: clientBalanceRechargeData.watingTimeInDays ?? waitingTimeInDays.DEFAULT
      })
    }

    // Calcula o resto da divisão do valor de recarga pelo número de vouchers
    const rechargeAmountRemainder = clientBalanceRechargeData.rechargeAmountInCents % clientCurrentVouchers.length

    // Se houver resto na divisão, adiciona o resto ao saldo do cliente
    if (rechargeAmountRemainder > 0) {
      await clientRepositories.updateOne(
        clientBalanceRechargeData.clientId,
        { availableBalanceInCents: { increment: rechargeAmountRemainder } }
      )

      // Registra a operação de devolução de resto ao saldo do cliente
      await clientBalanceTransactionRepositories.createOne({
        clientId: clientBalanceRechargeData.clientId,
        amountInCents: rechargeAmountRemainder,
        type: clientBalanceTransactionType.REMAINDER_REFUND
      })
    }
  } catch (error) {
    logger.error(error)
    throw new InternalServerError()
  }
}
