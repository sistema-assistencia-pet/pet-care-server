import { loginUser } from './loginUser'
import { loginMember } from './loginMember'
import { requestResetMemberPassword } from './requestResetMemberPassword'
import { resetMemberPassword } from './resetMemberPassword'
import { requestResetUserPassword } from './requestResetUserPassword'
import { resetUserPassword } from './resetUserPassword'
import { loginPartner } from './loginPartner'

const authControllers = {
  loginUser,
  loginMember,
  loginPartner,
  requestResetMemberPassword,
  requestResetUserPassword,
  resetMemberPassword,
  resetUserPassword
}

export { authControllers }
