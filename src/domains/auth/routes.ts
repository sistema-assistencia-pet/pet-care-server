import { Router } from 'express'

import { authControllers } from './controllers/authControllers'
import { authMiddlewares } from './middlewares/authMiddlewares'

const authRouter: Router = Router()

authRouter.post(
  '/login/admin',
  authMiddlewares.loginPayloadValidation,
  authControllers.loginAdmin
)

authRouter.post(
  '/login/member',
  authMiddlewares.loginPayloadValidation,
  authControllers.loginMember
)

authRouter.post(
  '/request-reset-member-password',
  authMiddlewares.requestResetMemberPasswordPayloadValidation,
  authControllers.requestResetMemberPassword
)

authRouter.post(
  '/reset-member-password',
  authMiddlewares.resetMemberPasswordPayloadValidation,
  authControllers.resetMemberPassword
)

export { authRouter }
