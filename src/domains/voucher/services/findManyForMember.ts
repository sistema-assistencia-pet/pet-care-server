import type { Prisma } from '@prisma/client'

import type { AccessTokenData, FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import type { FindManyVouchersQueryParams } from '../voucherInterfaces'
import { role } from '../../../enums/role'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'
import type { VoucherSettingsByClientToBeReturnedInFindMany } from '../../voucherSettingsByClient/voucherSettingsByClientInterfaces'
import { status } from '../../../enums/status'

export async function findManyForMember (
  accessTokenData: AccessTokenData,
  { skip, take, ...queryParams }: FindManyVouchersQueryParams
): Promise<FindManyResponse<VoucherSettingsByClientToBeReturnedInFindMany & { isAvailable: boolean }>> {
  const VOUCHERS_NOT_FOUND = 'Nenhum voucher encontrado.'

  const where: Prisma.VoucherSettingsByClientWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ voucher: { partner: { fantasyName: { contains: value as string } } } })
          where.OR?.push({ voucher: { partner: { category: { name: { contains: value as string } } } } })
          break
        case 'partnerCategoryId':
          where.OR?.push({ voucher: { partner: { categoryId: value as number } } })
          break
        case 'partnerCityId':
          where.OR?.push({ voucher: { partner: { cityId: value as number } } })
          break
        case 'partnerStateId':
          where.OR?.push({ voucher: { partner: { stateId: value as number } } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (accessTokenData.roleId === role.MEMBER) {
    where.OR?.push({
      clientId: accessTokenData.clientId,
      voucher: {
        statusId: status.ACTIVE,
        voucherCodes: { some: {} }
      }
    })
  }

  if (where.OR?.length === 0) delete where.OR

  const voucherSettingsByClient = await voucherSettingsByClientRepositories.findMany({ skip, take, where })

  const voucherSettingsByClientVerified = voucherSettingsByClient.map((voucherSettings) => ({
    isAvailable: voucherSettings.reservedBalanceInCents >= voucherSettings.voucher.value,
    ...voucherSettings
  }))

  if (voucherSettingsByClient.length === 0) throw new NotFoundError(VOUCHERS_NOT_FOUND)

  const totalCount = await voucherSettingsByClientRepositories.count(where)

  return { items: voucherSettingsByClientVerified, totalCount }
}
