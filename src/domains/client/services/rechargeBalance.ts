import { balanceDistributionSetting } from '../../../enums/balanceDistributionSetting'
import type { ClientBalanceRechargeData } from '../clientInterfaces'
import { clientRechargeRepositories } from '../../clientRecharge/repositories/clientRechargeRepositories'
import { clientRepositories } from '../repositories/clientRepositories'
import { BadRequestError, InternalServerError } from '../../../errors'
import { status } from '../../../enums/status'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import { waitingTimeInDays } from '../../../enums/waitingTimeInDays'

async function onlyUpdateClientBalance (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
  await clientRepositories.updateOne(
    clientBalanceRechargeData.clientId,
    { availableBalanceInCents: { increment: clientBalanceRechargeData.rechargeAmountInCents } }
  )
}

async function distributeRechargeAmongAllVouchers (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
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

async function distributeRechargeAmongClientCurrentVouchers (clientBalanceRechargeData: ClientBalanceRechargeData): Promise<void> {
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
    }
  } catch (error) {
    logger.error(error)
    throw new InternalServerError()
  }
}

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
