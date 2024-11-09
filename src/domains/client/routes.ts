import { Router } from 'express'

import { checkIfIsSystemUser } from '../../middlewares/authorization.middleware'
import { clientControllers } from './controllers/clientControllers'
import { clientMiddlewares } from './middlewares/clientMiddlewares'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const clientRouter: Router = Router()

// Criar cliente
clientRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsSystemUser,
  clientMiddlewares.createOnePayloadValidation,
  clientControllers.createOne
)

// Detalhes de um cliente
clientRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  clientControllers.findOneById
)

// Listar clientes
clientRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsSystemUser,
  clientMiddlewares.findManyQueryParamsValidation,
  clientControllers.findMany
)

// Ativar cliente
clientRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  clientControllers.activateOne
)

// Inativar cliente
clientRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  clientControllers.inactivateOne
)

// Excluir cliente
clientRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  clientControllers.deleteOne
)

// Editar cliente
clientRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  clientMiddlewares.updateOnePayloadValidation,
  clientControllers.updateOne
)

export { clientRouter }
