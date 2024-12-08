import type { AccessTokenData } from '../../../interfaces'
import { BadRequestError } from '../../../errors'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import { voucherRepositories } from '../repositories/voucherRepositories'
import { status } from '../../../enums/status'
import type { VoucherCode } from '@prisma/client'
import { voucherCodeRepositories } from '../../voucherCode/repositories/voucherCodeRepositories'
import { voucherRedemptionRepositories } from '../../voucherRedemption/repositories/voucherRedemptionRepositories'
import { memberVoucherWaitingLineRepositories } from '../../memberVoucherWaitingLine/repositories/memberVoucherWaitingLineRepositories'

export async function redeemOne (accessTokenData: AccessTokenData, id: string): Promise<VoucherCode['id']> {
  const CLIENT_VOUCHER_SETTINGS_NOT_FOUND = 'Configurações do voucher para este cliente não encontrada.'
  const VOUCHER_NOT_FOUND = 'Voucher não encontrado.'
  const VOUCHER_UNAVAILABLE = 'Voucher indisponível.'
  const VOUCHER_UNAVAILABLE_UNTIL = 'Voucher indisponível no momento. É neessário aguardar até PLACEHOLDER.'
  const TODAY = new Date()

  // Verifica se voucher existe e está ativo
  const voucher = await voucherRepositories.findOne({ id }, false, { statusId: status.ACTIVE })
  if (voucher === null) throw new BadRequestError(VOUCHER_NOT_FOUND)

  // Verifica se o cliente disponibilizou o voucher
  const voucherSettingsByClientList = await voucherSettingsByClientRepositories.findMany({ where: { clientId: accessTokenData.clientId } })
  if (voucherSettingsByClientList.length === 0) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_NOT_FOUND)

  // Verifica se há saldo reservado pelo cliente para o voucher suficiente para o resgate
  const voucherSettingsByClient = voucherSettingsByClientList[0]
  if (voucherSettingsByClient.reservedBalanceInCents < voucher.value) throw new BadRequestError(VOUCHER_UNAVAILABLE)

  // Verifica se há códigos disponíveis
  const voucherCodes = await voucherCodeRepositories.findMany({ voucherId: voucher.id, wasRedeemed: false })
  if (voucherCodes.length === 0) throw new BadRequestError(VOUCHER_UNAVAILABLE)

  // Verifica se o associado resgatou o voucher recentemente
  // e está aguardando o tempo de espera para usá-lo novamente
  const memberVoucherWaitingLine = await memberVoucherWaitingLineRepositories.findOne({ memberId: accessTokenData.id, voucherId: voucher.id })
  if (memberVoucherWaitingLine !== null) {
    if (memberVoucherWaitingLine.waitingUntil > TODAY) {
      throw new BadRequestError(VOUCHER_UNAVAILABLE_UNTIL.replace('PLACEHOLDER', memberVoucherWaitingLine.waitingUntil.toISOString()))
    }
  }

  // Seleciona o primeiro código disponível
  const voucherCode = voucherCodes[0]

  // Atualiza código para o estado de resgatado
  await voucherCodeRepositories.updateOne(voucherCode.id, { wasRedeemed: true })

  // Atualiza saldo reservado para o voucher nas configurações do cliente
  await voucherSettingsByClientRepositories.updateOne(
    accessTokenData.clientId,
    id,
    { reservedBalanceInCents: { decrement: voucher.value } }
  )

  // Salva resgate do voucher na tabela de resgates
  await voucherRedemptionRepositories.createOne({
    clientId: accessTokenData.clientId,
    memberId: accessTokenData.id,
    partnerId: voucher.partner.id,
    voucherCodeId: voucherCode.id,
    voucherId: voucher.id
  })

  // Calcula data de espera para reutilização do voucher
  const targetDate = new Date(TODAY)
  targetDate.setHours(TODAY.getHours() + voucherSettingsByClient.waitingTimeInHours)

  // Salva tempo de espera para reutilizar o voucher
  await memberVoucherWaitingLineRepositories.upsertOne({
    memberId: accessTokenData.id,
    voucherId: voucher.id,
    waitingUntil: targetDate
  })

  return voucherCode.id
}
