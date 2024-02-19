import { Router } from 'express'

import authController from './controllers'
import authMiddlewares from './middlewares'

const authRouter: Router = Router()

authRouter.post(
  '/login',
  authMiddlewares.validateLoginPayload,
  authController.login
)
export { authRouter }
