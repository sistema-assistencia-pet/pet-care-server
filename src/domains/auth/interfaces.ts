import { UserLoggedIn } from '../user/interfaces'

export interface ILoginResponse {
  accessToken: string
  user: UserLoggedIn
}
