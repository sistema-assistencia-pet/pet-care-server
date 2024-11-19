import { loginPayloadValidation } from './loginPayloadValidation'
import { partnerLoginPayloadValidation } from './partnerLoginPayloadValidation'
import { requestResetPasswordPayloadValidation } from './requestResetPasswordPayloadValidation'
import { resetPasswordPayloadValidation } from './resetPasswordPayloadValidation'

const authMiddlewares = {
  loginPayloadValidation,
  partnerLoginPayloadValidation,
  requestResetPasswordPayloadValidation,
  resetPasswordPayloadValidation
}

export { authMiddlewares }
