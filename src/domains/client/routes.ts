import { Router } from 'express'

import { checkIfIsMaster } from '../../middlewares/authorization.middleware'
import { clientControllers } from './controllers/clientControllers'
import { clientMiddlewares } from './middlewares/clientMiddlewares'
import { validateUuidParam } from '../../middlewares/validateUuidParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const clientRouter: Router = Router()

// Criar cliente
clientRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  clientMiddlewares.createOnePayloadValidation,
  clientControllers.createOne
)

// Detalhes de um cliente
clientRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  clientControllers.findOneById
)

// Listar clientes
clientRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  clientMiddlewares.findManyQueryParamsValidation,
  clientControllers.findMany
)

clientRouter.post(
  '/:id/balance/recharge',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  clientMiddlewares.rechargeBalancePayloadValidation,
  clientControllers.rechargeBalance
)

// Ativar cliente
clientRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  clientControllers.activateOne
)

// Inativar cliente
clientRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  clientControllers.inactivateOne
)

// Excluir cliente
clientRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  clientControllers.deleteOne
)

// Editar cliente
clientRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  clientMiddlewares.updateOnePayloadValidation,
  clientControllers.updateOne
)

export { clientRouter }
