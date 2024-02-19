import { User } from '@prisma/client'

export type UserToBeCreated = Pick<User, 'cpf' | 'name' | 'email' | 'password'>

export type UserCreated = Pick<User, 'id' | 'name'>

export type UserLoggedIn = Pick<User, 'id' | 'name' | 'password'>

export interface ICreateOneResponse {
  user: UserCreated
  accessToken: string
}
