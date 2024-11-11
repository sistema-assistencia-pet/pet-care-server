import { Router } from 'express'

import { authControllers } from './controllers/authControllers'
import { authMiddlewares } from './middlewares/authMiddlewares'

const authRouter: Router = Router()

authRouter.post(
  '/user/login',
  authMiddlewares.loginPayloadValidation,
  authControllers.loginUser
)

authRouter.post(
  '/user/request-reset-password',
  authMiddlewares.requestResetPasswordPayloadValidation,
  authControllers.requestResetUserPassword
)

authRouter.post(
  '/user/reset-password',
  authMiddlewares.resetPasswordPayloadValidation,
  authControllers.resetUserPassword
)

authRouter.post(
  '/member/login',
  authMiddlewares.loginPayloadValidation,
  authControllers.loginMember
)

authRouter.post(
  '/member/request-reset-password',
  authMiddlewares.requestResetPasswordPayloadValidation,
  authControllers.requestResetMemberPassword
)

authRouter.post(
  '/member/reset-password',
  authMiddlewares.resetPasswordPayloadValidation,
  authControllers.resetMemberPassword
)

export { authRouter }
