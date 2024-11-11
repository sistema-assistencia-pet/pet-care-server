import { Router } from 'express'

import { stateControllers } from './controllers/stateControllers'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const stateRouter: Router = Router()

stateRouter.get(
  '/',
  verifyAccessToken,
  stateControllers.findAll
)

export { stateRouter }
