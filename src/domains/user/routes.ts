import { Router } from 'express'

import userController from './controllers'
import userMiddlewares from './middlewares'
import { verifyAccessToken } from '../../middlewares/auth.middleware'

const userRouter: Router = Router()

userRouter.post(
  '/',
  verifyAccessToken,
  userMiddlewares.validateCreateOnePayload,
  userController.createOne
)

export { userRouter }
