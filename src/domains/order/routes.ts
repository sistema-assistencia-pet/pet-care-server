import { Router } from 'express'

import { checkIfIsAdmin } from '../../middlewares/authorization.middleware'
import orderController from './controller'
import orderMiddlewares from './middlewares'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'

const orderRouter: Router = Router()

// Criar associado
orderRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  orderMiddlewares.validateCreateOnePayload,
  orderController.createOne
)

// Ativar associado 
orderRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  orderController.activateOne
)

// Inativar associado 
orderRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  orderController.inactivateOne
)

// Excluir associado
orderRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  orderController.deleteOne
)

export { orderRouter }
