import type { Category, City, MemberVoucherWaitingLine, Partner, Prisma, State, Voucher } from '@prisma/client'

import type { PartnerMinData } from '../partner/partnerInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'

export type VoucherToBeCreated = Omit<Voucher, 'id' | 'statusId' | 'createdAt' | 'updatedAt'>

export type VoucherToBeUpdated = Partial<VoucherToBeCreated>

export type VoucherToBeReturnedByDb = Omit<Voucher, 'partnerId' | 'statusId'> & { partner: PartnerMinData } & { status: StatusToBeReturned } & { memberVoucherWaitingLines?: Array<{ waitingUntil: Date }> }

export type VoucherToBeReturned = Omit<VoucherToBeReturnedByDb, 'memberVoucherWaitingLines'> & { waitingUntil: MemberVoucherWaitingLine['waitingUntil'] | null }

export type VoucherToBeReturnedInFindMany = Pick<VoucherToBeReturned, 'id' | 'title' | 'description' | 'rules'>
& {
  partner: Pick<Partner, 'id' | 'fantasyName'>
  & { category: Pick<Category, 'id' | 'name'> }
  & { city: Pick<City, 'id' | 'name'> | null }
  & { state: State | null }
}

export interface FindManyVouchersQueryParams {
  partnerCategoryId?: number | typeof NaN
  partnerCityId?: number | typeof NaN
  partnerStateId?: number | typeof NaN
  clientId?: string
  searchInput?: string
  skip?: number
  statusId?: number | typeof NaN
  take?: number
}

export interface FindManyVouchersParams {
  skip?: number
  take?: number
  where: Partial<Prisma.VoucherWhereInput>
}
