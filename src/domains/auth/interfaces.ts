import { type User } from '@prisma/client'

export interface ILoginResponse {
  accessToken: string
  user: Pick<User, 'id' | 'name' | 'roleId'>
}
