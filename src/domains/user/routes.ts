import { Router } from 'express'

import { checkIfIsUser } from '../../middlewares/authorization.middleware'
import { userControllers } from './controllers/userControllers'
import { userMiddlewares } from './middlewares/userMiddlewares'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { validateUuidParam } from '../../middlewares/validateUuidParam.middleware'

const userRouter: Router = Router()

// Criar usuário
userRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.createOneAuthorization,
  userMiddlewares.createOnePayloadValidation,
  userControllers.createOne
)

// Criar usuário sem validações
userRouter.post(
  '/unvalidated',
  userMiddlewares.createOnePayloadValidation,
  userControllers.createOne
)

// Detalhes de um usuário
userRouter.get(
  '/:id',
  verifyAccessToken,
  validateUuidParam,
  userControllers.findOneById
)

// Listar usuários
userRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.findManyQueryParamsValidation,
  userControllers.findMany
)

export { userRouter }
