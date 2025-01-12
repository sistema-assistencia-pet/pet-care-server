/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import type { Prisma } from '@prisma/client'

import type { AccessTokenData, FindManyResponse } from '../../../interfaces'
import { NotFoundError } from '../../../errors'
import { voucherRepositories } from '../repositories/voucherRepositories'
import type {
  FindManyVouchersQueryParams,
  VoucherToBeReturnedInFindMany
} from '../voucherInterfaces'
import { role } from '../../../enums/role'

export async function findMany (
  accessTokenData: AccessTokenData,
  { skip, take, ...queryParams }: FindManyVouchersQueryParams
): Promise<FindManyResponse<VoucherToBeReturnedInFindMany>> {
  const VOUCHERS_NOT_FOUND = 'Nenhum voucher encontrado.'

  const where: Prisma.VoucherWhereInput = { OR: [] }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case 'searchInput':
          where.OR?.push({ partner: { fantasyName: { contains: value as string } } })
          where.OR?.push({ partner: { category: { name: { contains: value as string } } } })
          where.OR?.push({ title: { contains: value as string } })
          break
        case 'clientId':
          where.OR?.push({ voucherSettingsByClients: { some: { clientId: value as string } } })
          break
        case 'partnerCategoryId':
          where.OR?.push({ partner: { categoryId: value as number } })
          break
        case 'partnerCityId':
          where.OR?.push({ partner: { cityId: value as number } })
          break
        case 'partnerStateId':
          where.OR?.push({ partner: { stateId: value as number } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (where.OR?.length === 0) delete where.OR

  const vouchers = await voucherRepositories.findMany({ skip, take, where })

  if (vouchers.length === 0) throw new NotFoundError(VOUCHERS_NOT_FOUND)

  let vouchersWithSettingsFiltered: VoucherToBeReturnedInFindMany[] = []

  if (
    (queryParams.clientId) || // Se há clientId no filtro da requisição, é necessário filtrar configurações
    (accessTokenData.roleId === role.CLIENT_ADMIN) // Se o usuário da requisição for admin de cliente, é necessário filtrar configurações
  ) {
    vouchersWithSettingsFiltered = vouchers.map((voucher) => {
      voucher.voucherSettingsByClients = voucher.voucherSettingsByClients?.filter(
        (voucherSetting) => voucherSetting.clientId === (queryParams.clientId || accessTokenData.clientId)
      )

      return voucher
    })
  } else { // Se não há clientId no filtro da requisição, não é necessário filtrar configurações
    vouchersWithSettingsFiltered = vouchers
  }

  const totalCount = await voucherRepositories.count(where)

  return { items: vouchersWithSettingsFiltered, totalCount }
}
