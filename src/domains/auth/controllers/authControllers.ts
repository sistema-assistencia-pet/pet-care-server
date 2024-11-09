import { loginAdmin } from './loginAdmin'
import { loginMember } from './loginMember'
import { requestResetMemberPassword } from './requestResetMemberPassword'
import { resetMemberPassword } from './resetMemberPassword'

const authControllers = {
  loginAdmin,
  loginMember,
  requestResetMemberPassword,
  resetMemberPassword
}

export { authControllers }
