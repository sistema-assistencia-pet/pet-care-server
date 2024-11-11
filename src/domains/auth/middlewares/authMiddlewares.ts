import { loginPayloadValidation } from './loginPayloadValidation'
import { requestResetPasswordPayloadValidation } from './requestResetPasswordPayloadValidation'
import { resetPasswordPayloadValidation } from './resetPasswordPayloadValidation'

const authMiddlewares = {
  loginPayloadValidation,
  requestResetPasswordPayloadValidation,
  resetPasswordPayloadValidation
}

export { authMiddlewares }
