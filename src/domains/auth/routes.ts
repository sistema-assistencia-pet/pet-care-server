import { Router } from 'express'

import { authControllers } from './controllers/authControllers'
import { authMiddlewares } from './middlewares/authMiddlewares'

const authRouter: Router = Router()

// Login de usuário
authRouter.post(
  '/user/login',
  authMiddlewares.loginPayloadValidation,
  authControllers.loginUser
)

// Solicitar redefinição de senha de usuário
authRouter.post(
  '/user/request-reset-password',
  authMiddlewares.requestResetPasswordPayloadValidation,
  authControllers.requestResetUserPassword
)

// Redefinir senha de usuário
authRouter.post(
  '/user/reset-password',
  authMiddlewares.resetPasswordPayloadValidation,
  authControllers.resetUserPassword
)

// Login de associado
authRouter.post(
  '/member/login',
  authMiddlewares.loginPayloadValidation,
  authControllers.loginMember
)

// Solicitar redefinição de senha de associado
authRouter.post(
  '/member/request-reset-password',
  authMiddlewares.requestResetPasswordPayloadValidation,
  authControllers.requestResetMemberPassword
)

// Redefinir senha de associado
authRouter.post(
  '/member/reset-password',
  authMiddlewares.resetPasswordPayloadValidation,
  authControllers.resetMemberPassword
)

// Login de estabelecimento
authRouter.post(
  '/partner/login',
  authMiddlewares.partnerLoginPayloadValidation,
  authControllers.loginPartner
)

export { authRouter }
