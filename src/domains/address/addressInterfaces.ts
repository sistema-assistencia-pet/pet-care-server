import type { Address, State } from '@prisma/client'
import type { CityToBeReturned } from '../city/cityInterfaces'

export type AddressToBeCreated = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>

export type AddressToBeReturned = Omit<Address, 'cityId' | 'stateId' | 'createdAt' | 'updatedAt'> & { city: Omit<CityToBeReturned, 'stateId'> | null } & { state: State | null }
