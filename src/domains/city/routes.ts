import { Router } from 'express'

import { checkIfIsMasterUser, checkIfIsUser } from '../../middlewares/authorization.middleware'
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
  checkIfIsUser,
  cityMiddlewares.createOnePayloadValidation,
  cityControllers.createOne
)

// Excluir cidade
cityRouter.delete(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterUser,
  validateNumberIdParam,
  cityControllers.deleteOne
)

export { cityRouter }
