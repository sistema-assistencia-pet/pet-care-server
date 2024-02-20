import { Router } from 'express'

import { checkIfIsAdmin } from '../../middlewares/authorization.middleware'
import memberController from './controllers'
import memberMiddlewares from './middlewares'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const memberRouter: Router = Router()

memberRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  memberMiddlewares.validateCreateOnePayload,
  memberController.createOne
)

export { memberRouter }
