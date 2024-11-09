import { loginPayloadValidation } from './loginPayloadValidation'
import { requestResetMemberPasswordPayloadValidation } from './requestResetMemberPasswordPayloadValidation'
import { resetMemberPasswordPayloadValidation } from './resetMemberPasswordPayloadValidation'

const authMiddlewares = {
  loginPayloadValidation,
  requestResetMemberPasswordPayloadValidation,
  resetMemberPasswordPayloadValidation
}

export { authMiddlewares }
