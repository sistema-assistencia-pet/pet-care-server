import { Router } from 'express'

import { stateControllers } from './controllers/stateControllers'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { checkIfIsMasterOrClientOrMember } from '../../middlewares/authorization.middleware'

const stateRouter: Router = Router()

stateRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClientOrMember,
  stateControllers.findAll
)

export { stateRouter }
