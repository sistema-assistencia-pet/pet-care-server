import { Router } from 'express'

import { checkIfIsAdmin } from '../../middlewares/authorization.middleware'
import orderController from './controller'
import orderMiddlewares from './middlewares'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const orderRouter: Router = Router()

// Criar associado
orderRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  orderMiddlewares.validateCreateOnePayload,
  orderController.createOne
)

export { orderRouter }
