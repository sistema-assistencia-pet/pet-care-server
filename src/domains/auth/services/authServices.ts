import { loginAdmin } from './loginAdmin'
import { loginMember } from './loginMember'
import { requestResetMemberPassword } from './requestResetMemberPassword'
import { resetMemberPassword } from './resetMemberPassword'

const authServices = {
  loginAdmin,
  loginMember,
  requestResetMemberPassword,
  resetMemberPassword
}

export { authServices }
