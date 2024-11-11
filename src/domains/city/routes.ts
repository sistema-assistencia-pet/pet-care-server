import { Router } from 'express'

import { cityControllers } from './controllers/cityControllers'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const cityRouter: Router = Router()

cityRouter.get(
  '/',
  verifyAccessToken,
  cityControllers.findMany
)

export { cityRouter }
