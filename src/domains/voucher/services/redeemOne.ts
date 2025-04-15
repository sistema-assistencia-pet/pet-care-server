import type { AccessTokenData } from '../../../interfaces'
import { BadRequestError } from '../../../errors'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import { voucherRepositories } from '../repositories/voucherRepositories'
import { status } from '../../../enums/status'
import type { VoucherCode } from '@prisma/client'
import { voucherCodeRepositories } from '../../voucherCode/repositories/voucherCodeRepositories'
import { voucherRedemptionRepositories } from '../../voucherRedemption/repositories/voucherRedemptionRepositories'
import { memberVoucherWaitingLineRepositories } from '../../memberVoucherWaitingLine/repositories/memberVoucherWaitingLineRepositories'
import { generateVoucherCode } from '../../voucherCode/utils/generateVoucherCode'
import { role } from '../../../enums/role'
import type { VoucherSettingsByClientToBeReturnedInFindMany } from '../../voucherSettingsByClient/voucherSettingsByClientInterfaces'

export async function redeemOne (accessTokenData: AccessTokenData, id: string): Promise<VoucherCode['code']> {
  const CLIENT_VOUCHER_SETTINGS_NOT_FOUND = 'Configurações do voucher para este cliente não encontrada.'
  const VOUCHER_NOT_FOUND = 'Voucher não encontrado.'
  const VOUCHER_UNAVAILABLE = 'Voucher indisponível.'
  const VOUCHER_UNAVAILABLE_UNTIL = 'Voucher indisponível no momento. É necessário aguardar até PLACEHOLDER.'
  const TODAY = new Date()

  // Verifica se voucher existe e está ativo
  const voucher = await voucherRepositories.findOne({ id }, false, { statusId: status.ACTIVE })
  if (voucher === null) throw new BadRequestError(VOUCHER_NOT_FOUND)

  let voucherSettingsByClientList: VoucherSettingsByClientToBeReturnedInFindMany[] = []
  let voucherSettingsByClient: VoucherSettingsByClientToBeReturnedInFindMany | null = null

  // Se não for requisição de usuário MASTER, realiza algumas verificações
  if (accessTokenData.roleId !== role.MASTER) {
    // Verifica se o cliente disponibilizou o voucher
    voucherSettingsByClientList = await voucherSettingsByClientRepositories.findMany({ where: { clientId: accessTokenData.clientId } })
    if (voucherSettingsByClientList.length === 0) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_NOT_FOUND)

    // Verifica se há saldo reservado pelo cliente para o voucher suficiente para o resgate
    voucherSettingsByClient = voucherSettingsByClientList[0]
    if (voucherSettingsByClient.reservedBalanceInCents < voucher.value) throw new BadRequestError(VOUCHER_UNAVAILABLE)

    // Verifica se o associado resgatou o voucher recentemente
    // e está aguardando o tempo de espera para usá-lo novamente
    const memberVoucherWaitingLine = await memberVoucherWaitingLineRepositories.findOne({ memberId: accessTokenData.id, voucherId: voucher.id })
    if (memberVoucherWaitingLine !== null) {
      if (memberVoucherWaitingLine.waitingUntil > TODAY) {
        throw new BadRequestError(VOUCHER_UNAVAILABLE_UNTIL.replace('PLACEHOLDER', memberVoucherWaitingLine.waitingUntil.toLocaleString('pt-BR')))
      }
    }

    // Verifica se o associado já resgatou 2 vouchers dentro dos últimos 12 meses
    const voucherRedemptionCount = await voucherRedemptionRepositories.count({
      memberId: accessTokenData.id,
      createdAt: { gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }
    })
    if (voucherRedemptionCount >= 2) throw new BadRequestError('Associado já resgatou 2 vouchers dentro dos últimos 12 meses.')
  }

  // Gera um novo código do voucher
  const voucherCode = generateVoucherCode()

  // Cadastra o código do voucher
  // e marca como resgatado
  const voucherCodeId = await voucherCodeRepositories.createOne({
    code: voucherCode,
    voucherId: voucher.id,
    wasRedeemed: true
  })

  // Se não for requisição de usuário MASTER, atualiza saldo reservado para o voucher nas configurações do cliente
  if (accessTokenData.roleId !== role.MASTER) {
    await voucherSettingsByClientRepositories.updateOne(
      accessTokenData.clientId,
      id,
      { reservedBalanceInCents: { decrement: voucher.value } }
    )
  }

  // Salva resgate do voucher na tabela de resgates
  await voucherRedemptionRepositories.createOne({
    clientId: accessTokenData.clientId,
    memberId: accessTokenData.id,
    partnerId: voucher.partner.id,
    voucherCodeId,
    voucherId: voucher.id
  })

  // Se não for requisição de usuário MASTER, controle tempo de espera para reutilizar o voucher
  if (accessTokenData.roleId !== role.MASTER) {
    // Calcula data de espera para reutilização do voucher
    const targetDate = new Date(TODAY)
    targetDate.setHours(TODAY.getHours() + (voucherSettingsByClient?.waitingTimeInHours ?? 0))

    // Salva tempo de espera para reutilizar o voucher
    await memberVoucherWaitingLineRepositories.upsertOne({
      memberId: accessTokenData.id,
      voucherId: voucher.id,
      waitingUntil: targetDate
    })
  }

  return voucherCode
}
