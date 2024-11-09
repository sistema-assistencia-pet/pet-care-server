import { type User } from '@prisma/client'

export type UserToBeCreated = Omit<User, 'id' | 'statusId' | 'createdAt' | 'updatedAt'>

export type UserCreated = Pick<User, 'id' | 'name'>

export type UserLoggedIn = Pick<User, 'id' | 'name' | 'password' | 'roleId'>

export interface ICreateOneResponse {
  user: UserCreated
  accessToken: string
}
