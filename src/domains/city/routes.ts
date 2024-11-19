import { Router } from 'express'

import { checkIfIsMaster, checkIfIsMasterOrClient } from '../../middlewares/authorization.middleware'
import { cityControllers } from './controllers/cityControllers'
import { cityMiddlewares } from './middlewares/cityMiddlewares'
import { validateNumberIdParam } from '../../middlewares/validateNumberIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const cityRouter: Router = Router()

// Listar cidades
cityRouter.get(
  '/',
  verifyAccessToken,
  cityMiddlewares.findManyQueryParamsValidation,
  cityControllers.findMany
)

// Criar cidade
cityRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  cityMiddlewares.createOnePayloadValidation,
  cityControllers.createOne
)

// Excluir cidade
cityRouter.delete(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateNumberIdParam,
  cityControllers.deleteOne
)

// Editar cidade
cityRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateNumberIdParam,
  cityMiddlewares.updateOnePayloadValidation,
  cityControllers.updateOne
)

export { cityRouter }
