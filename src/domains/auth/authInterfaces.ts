import type { UserLoginInfo } from '../user/userInterfaces'
import type { MemberLoginInfo } from '../member/memberInterfaces'

export interface IUserLoginResponse {
  accessToken: string
  user: UserLoginInfo
}

export interface IMemberLoginResponse {
  accessToken: string
  user: MemberLoginInfo
}
