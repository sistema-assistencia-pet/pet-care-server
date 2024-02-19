import { Router } from 'express'

import userController from './controllers'
import userMiddlewares from './middlewares'

const userRouter: Router = Router()

userRouter.post(
  '/',
  userMiddlewares.validateCreateOnePayload,
  userController.createOne
)

export { userRouter }
