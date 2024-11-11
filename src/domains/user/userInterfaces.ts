import type { User } from '@prisma/client'
import type { ClientDataForLogin } from '../client/clientInterfaces'

export type UserToBeCreated = Omit<User, 'id' | 'statusId' | 'createdAt' | 'updatedAt'>

export type UserCreated = Pick<User, 'id' | 'name'>

export type UserWithClientData = User & { client: ClientDataForLogin | null }

export type UserLoginInfo = Pick<UserWithClientData, 'id' | 'name' | 'roleId' | 'client'>

export interface ICreateOneResponse {
  user: UserCreated
  accessToken: string
}
