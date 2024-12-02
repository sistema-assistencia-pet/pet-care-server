import { BadRequestError, NotFoundError } from '../../../errors'
import { clientBalanceTransactionRepositories } from '../../clientBalanceTransaction/repositories/clientBalanceTransactionRepositories'
import { clientBalanceTransactionType } from '../../../enums/clientBalanceTransactionType'
import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeReturned, ConfigureVoucherData } from '../clientInterfaces'
import { status } from '../../../enums/status'
import { voucherBalanceOperationType } from '../../../enums/voucherBalanceOperationType'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import type { VoucherSettingsByClientToBeCreated, VoucherSettingsByClientToBeUpdated } from '../../voucherSettingsByClient/voucherSettingsByClientInterfaces'
import { waitingTimeInDays } from '../../../enums/waitingTimeInDays'

async function allocateBalanceToVoucher (
  configureVoucherData: ConfigureVoucherData,
  client: ClientToBeReturned
): Promise<void> {
  const INSUFICIENT_CLIENT_BALANCE = 'Saldo do cliente insuficiente.'

  // Verifica se o cliente tem saldo suficiente para alocar no voucher
  if ((client.availableBalanceInCents ?? 0) < configureVoucherData.rechargeAmountInCents) throw new BadRequestError(INSUFICIENT_CLIENT_BALANCE)

  // Resgata saldo do cliente (salva descréscimo)
  await clientRepositories.updateOne(
    configureVoucherData.clientId,
    { availableBalanceInCents: { decrement: configureVoucherData.rechargeAmountInCents } }
  )

  // Registra a operação de consumo do saldo do cliente
  await clientBalanceTransactionRepositories.createOne({
    clientId: configureVoucherData.clientId,
    amountInCents: -(configureVoucherData.rechargeAmountInCents),
    type: clientBalanceTransactionType.USAGE
  })

  const voucherSettingsByClientToBeUpserted: VoucherSettingsByClientToBeCreated = {
    clientId: configureVoucherData.clientId,
    voucherId: configureVoucherData.voucherId,
    reservedBalanceInCents: configureVoucherData.rechargeAmountInCents,
    watingTimeInDays: configureVoucherData.watingTimeInDays ?? waitingTimeInDays.DEFAULT
  }

  // Registra configuração de voucher para o cliente
  await voucherSettingsByClientRepositories.upsertOne(voucherSettingsByClientToBeUpserted)
}

async function deallocateBalanceFromVoucher (configureVoucherData: ConfigureVoucherData): Promise<void> {
  const INSUFICIENT_VOUCHER_BALANCE = 'Saldo do voucher insuficiente.'
  const CLIENT_VOUCHER_SETTINGS_NOT_FOUND = 'Configurações do voucher para este cliente não encontrada.'

  const voucherSettingsByClientList = await voucherSettingsByClientRepositories.findMany({ clientId: configureVoucherData.clientId, voucherId: configureVoucherData.voucherId })
  if (voucherSettingsByClientList.length === 0) throw new BadRequestError(CLIENT_VOUCHER_SETTINGS_NOT_FOUND)

  const voucherSettingsByClient = voucherSettingsByClientList[0]

  // Verifica se o voucher está com saldo suficiente para ser devolvido ao cliente
  if ((voucherSettingsByClient.reservedBalanceInCents ?? 0) < configureVoucherData.rechargeAmountInCents) {
    throw new BadRequestError(INSUFICIENT_VOUCHER_BALANCE)
  }

  const voucherSettingsByClientToBeUpdated: VoucherSettingsByClientToBeUpdated = {
    reservedBalanceInCents: { decrement: configureVoucherData.rechargeAmountInCents },
    watingTimeInDays: configureVoucherData.watingTimeInDays ?? waitingTimeInDays.DEFAULT
  }

  // Desaloca saldo do voucher
  await voucherSettingsByClientRepositories.updateOne(
    configureVoucherData.clientId,
    configureVoucherData.voucherId,
    voucherSettingsByClientToBeUpdated
  )

  // Devolve saldo ao cliente (vindo do voucher)
  await clientRepositories.updateOne(
    configureVoucherData.clientId,
    { availableBalanceInCents: { increment: configureVoucherData.rechargeAmountInCents } }
  )

  // Registra a operação de devolução do saldo do cliente vindo do voucher
  await clientBalanceTransactionRepositories.createOne({
    clientId: configureVoucherData.clientId,
    amountInCents: configureVoucherData.rechargeAmountInCents,
    type: clientBalanceTransactionType.VOUCHER_REFUND
  })
}

export async function configureVoucher (configureVoucherData: ConfigureVoucherData): Promise<void> {
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'
  const VOUCHER_NOT_FOUND = 'Voucher não encontrado.'

  // Verifica se o cliente existe
  const client = await clientRepositories.findOne({ id: configureVoucherData.clientId }, true, { statusId: status.ACTIVE })
  if (client === null) throw new NotFoundError(CLIENT_NOT_FOUND)

  // Verifica se o voucher existe
  const voucher = await voucherRepositories.findOne({ id: configureVoucherData.voucherId }, true, { statusId: status.ACTIVE })
  if (voucher === null) throw new NotFoundError(VOUCHER_NOT_FOUND)

  if (configureVoucherData.voucherBalanceOperationType === voucherBalanceOperationType.ALLOCATE) { // Se a operação é de ALOCAR saldo em um voucher
    await allocateBalanceToVoucher(configureVoucherData, client)
  } else { // Se a operação é de DESALOCAR saldo de um voucher
    await deallocateBalanceFromVoucher(configureVoucherData)
  }
}
