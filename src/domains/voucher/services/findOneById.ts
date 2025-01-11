import type { Prisma, Voucher } from '@prisma/client'

import type { AccessTokenData } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import { voucherRepositories } from '../repositories/voucherRepositories'
import type { VoucherToBeReturned, VoucherToBeReturnedByDb } from '../voucherInterfaces'
import { role } from '../../../enums/role'

function formatVoucherDetails (voucher: VoucherToBeReturnedByDb): VoucherToBeReturned {
  const memberVoucherWaitingLines = voucher.memberVoucherWaitingLines

  delete voucher.memberVoucherWaitingLines

  return {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    waitingUntil: memberVoucherWaitingLines?.length
      ? memberVoucherWaitingLines[0].waitingUntil
      : null,
    ...voucher
  }
}

export async function findOneById (accessTokenData: AccessTokenData, id: Voucher['id']): Promise<VoucherToBeReturned> {
  const VOUCHER_NOT_FOUND = 'Voucher não encontrado.'

  const where: Prisma.VoucherWhereInput = {}

  // if (accessTokenData.roleId === role.CLIENT_ADMIN) {
  //   Object.assign(
  //     where,
  //     { voucherSettingsByClients: { some: { clientId: accessTokenData.clientId } } }
  //   )
  // }

  const shouldReturnFullData = accessTokenData.roleId === role.MEMBER // Se for membro deve retornar tempo de espera

  const voucher = await voucherRepositories.findOne({ id }, shouldReturnFullData, where)

  if (voucher === null) throw new NotFoundError(VOUCHER_NOT_FOUND)

  const voucherFormatted = formatVoucherDetails(voucher)

  return voucherFormatted
}
