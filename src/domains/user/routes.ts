import { Router } from 'express'

import { checkIfIsUser } from '../../middlewares/authorization.middleware'
import { userControllers } from './controllers/userControllers'
import { userMiddlewares } from './middlewares/userMiddlewares'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const userRouter: Router = Router()

userRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.createOneAuthorization,
  userMiddlewares.createOnePayloadValidation,
  userControllers.createOne
)

userRouter.post(
  '/first',
  userMiddlewares.createOnePayloadValidation,
  userControllers.createFirst
)

export { userRouter }
