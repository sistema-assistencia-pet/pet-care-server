import type { Prisma, User } from '@prisma/client'

import type { ClientMinData } from '../client/clientInterfaces'
import type { RoleMinData } from '../role/roleInterfaces'
import type { StatusMinData } from '../status/statusInterfaces'

export type UserToBeCreated = Omit<User, 'id' | 'statusId' | 'createdAt' | 'updatedAt'>

export type UserCreated = Pick<User, 'id' | 'name'>

export type UserWithClientData = User & { client: ClientMinData | null }

export type UserLoginInfo = Pick<UserWithClientData, 'id' | 'name' | 'roleId' | 'client'>

export type UserToBeReturned = Omit<User, 'password' | 'clientId' | 'roleId' | 'statusId'> & { client: ClientMinData | null } & { role: RoleMinData } & { status: StatusMinData }

export type UserToBeReturnedInFindMany = Omit<UserToBeReturned, 'updatedAt' | 'email'>

export interface ICreateOneResponse {
  user: UserCreated
  accessToken: string
}

export interface FindManyUsersQueryParams {
  searchInput?: string
  skip?: number
  statusId?: number | typeof NaN
  take?: number
}

export interface FindManyUsersParams {
  skip?: number
  take?: number
  where: Partial<Prisma.UserWhereInput>
}
