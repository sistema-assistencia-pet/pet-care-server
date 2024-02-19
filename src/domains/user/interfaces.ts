import { User } from '@prisma/client'

export type UserToBeCreated = Pick<User, 'cpf' | 'name' | 'email' | 'password' | 'roleId'>

export type UserCreated = Pick<User, 'id' | 'name'>

export type UserLoggedIn = Pick<User, 'id' | 'name' | 'password' | 'roleId'>

export interface ICreateOneResponse {
  user: UserCreated
  accessToken: string
}
