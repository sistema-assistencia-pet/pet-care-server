import { Router } from 'express'

import { checkIfIsUser } from '../../middlewares/authorization.middleware'
import { clientControllers } from './controllers/clientControllers'
import { clientMiddlewares } from './middlewares/clientMiddlewares'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'
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
  validateIdParam,
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
  validateIdParam,
  clientControllers.activateOne
)

// Inativar cliente
clientRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  clientControllers.inactivateOne
)

// Excluir cliente
clientRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  clientControllers.deleteOne
)

// Editar cliente
clientRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  clientMiddlewares.updateOnePayloadValidation,
  clientControllers.updateOne
)

export { clientRouter }
