import { Router } from 'express'

import { checkIfIsMaster, checkIfIsMasterOrClient } from '../../middlewares/authorization.middleware'
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
  checkIfIsMasterOrClient,
  validateUuidParam,
  clientControllers.findOneById
)

// Listar clientes
clientRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  clientMiddlewares.findManyQueryParamsValidation,
  clientControllers.findMany
)

// Ativar cliente
clientRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  clientControllers.activateOne
)

// Inativar cliente
clientRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  clientControllers.inactivateOne
)

// Excluir cliente
clientRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  clientControllers.deleteOne
)

// Editar cliente
clientRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  clientMiddlewares.updateOnePayloadValidation,
  clientControllers.updateOne
)

export { clientRouter }
