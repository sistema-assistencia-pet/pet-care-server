import { Router } from 'express'

import authController from './controllers'
import authMiddlewares from './middlewares'

const authRouter: Router = Router()

authRouter.post(
  '/login/admin',
  authMiddlewares.validateLoginPayload,
  authController.loginAdmin
)

authRouter.post(
  '/login/member',
  authMiddlewares.validateLoginPayload,
  authController.loginMember
)

authRouter.post(
  '/request-reset-member-password',
  authMiddlewares.validateRequestResetMemberPasswordPayload,
  authController.requestResetMemberPassword
)

authRouter.post(
  '/reset-member-password',
  authMiddlewares.validateResetMemberPasswordPayload,
  authController.resetMemberPassword
)

export { authRouter }
