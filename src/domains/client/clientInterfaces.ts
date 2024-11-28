import type { Prisma, Client, User, State, ClientRecharge, VoucherSettingsByClient } from '@prisma/client'

import type { AddressToBeCreated, AddressToBeReturned } from '../address/addressInterfaces'
import type { balanceDistributionSetting } from '../../enums/balanceDistributionSetting'
import type { CityToBeReturned } from '../city/cityInterfaces'
import type { StatusToBeReturned } from '../status/statusInterfaces'

export type ClientToBeCreated = Omit<Client, 'id' | 'availableBalanceInCents' | 'addressId' | 'cityId' | 'stateId' | 'statusId' | 'createdAt' | 'updatedAt'> & { address: AddressToBeCreated | null } & { managerCpf: User['cpf'], managerPassword: User['password'] }

export type ClientToBeReturned = Omit<Client, 'stateId' | 'cityId' | 'addressId' | 'statusId'> & { address: AddressToBeReturned | null } & { status: StatusToBeReturned }

export type ClientToBeReturnedInFindMany = Pick<Client, 'id' | 'cnpj' | 'fantasyName' | 'segment' | 'availableBalanceInCents' | 'createdAt'> & { city: Omit<CityToBeReturned, 'stateId'> | null, state: State | null }

export type ClientMinData = Pick<Client, 'id' | 'fantasyName'>

export type ClientToBeUpdated = Omit<Partial<ClientToBeCreated>, 'managerCpf' | 'managerPassword'>

export interface FindManyClientsQueryParams {
  searchInput?: string
  take?: number
  skip?: number
  statusId?: number | typeof NaN
}

export interface FindManyClientsParams {
  skip?: number
  take?: number
  where: Partial<Prisma.ClientWhereInput>
}

export interface ClientBalanceRechargeData {
  clientId: Client['id']
  rechargeAmountInCents: ClientRecharge['amountInCents']
  balanceDistributionSetting: balanceDistributionSetting
  watingTimeInDays?: VoucherSettingsByClient['watingTimeInDays']
}

export type ClientBalanceDistributionData = Omit<ClientBalanceRechargeData, 'rechargeAmountInCents'>
