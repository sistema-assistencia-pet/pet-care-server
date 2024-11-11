import { loginUser } from './loginUser'
import { loginMember } from './loginMember'
import { requestResetMemberPassword } from './requestResetMemberPassword'
import { resetMemberPassword } from './resetMemberPassword'
import { requestResetUserPassword } from './requestResetUserPassword'
import { resetUserPassword } from './resetUserPassword'

const authServices = {
  loginUser,
  loginMember,
  requestResetMemberPassword,
  requestResetUserPassword,
  resetMemberPassword,
  resetUserPassword
}

export { authServices }
