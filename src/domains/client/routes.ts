import { Router } from 'express'

import { checkIfIsUser } from '../../middlewares/authorization.middleware'
import { clientControllers } from './controllers/clientControllers'
import { clientMiddlewares } from './middlewares/clientMiddlewares'
import { validateUuidParam } from '../../middlewares/validateUuidParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const clientRouter: Router = Router()

// Criar cliente
clientRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  clientMiddlewares.createOnePayloadValidation,
  clientControllers.createOne
)

// Detalhes de um cliente
clientRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  validateUuidParam,
  clientControllers.findOneById
)

// Listar clientes
clientRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  clientMiddlewares.findManyQueryParamsValidation,
  clientControllers.findMany
)

// Ativar cliente
clientRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsUser,
  validateUuidParam,
  clientControllers.activateOne
)

// Inativar cliente
clientRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsUser,
  validateUuidParam,
  clientControllers.inactivateOne
)

// Excluir cliente
clientRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsUser,
  validateUuidParam,
  clientControllers.deleteOne
)

// Editar cliente
clientRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  validateUuidParam,
  clientMiddlewares.updateOnePayloadValidation,
  clientControllers.updateOne
)

export { clientRouter }
