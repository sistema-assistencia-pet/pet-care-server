import type { UserLoginInfo } from '../user/userInterfaces'
import type { MemberLoginInfo } from '../member/memberInterfaces'
import type { PartnerLoginInfo } from '../partner/partnerInterfaces'

export interface IUserLoginResponse {
  accessToken: string
  user: UserLoginInfo
}

export interface IMemberLoginResponse {
  accessToken: string
  user: MemberLoginInfo
}

export interface IPartnerLoginResponse {
  accessToken: string
  user: PartnerLoginInfo
}
