import { Router } from 'express'

import { checkIfIsSystemUser } from '../../middlewares/authorization.middleware'
import { userControllers } from './controllers/userControllers'
import { userMiddlewares } from './middlewares/userMiddlewares'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const userRouter: Router = Router()

userRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsSystemUser,
  userMiddlewares.createOneAuthorization,
  userMiddlewares.createOnePayloadValidation,
  userControllers.createOne
)

export { userRouter }
