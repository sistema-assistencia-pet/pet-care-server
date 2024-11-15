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
  userMiddlewares.manageUserAuthorization,
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

// Ativar usuário
userRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.manageUserAuthorization,
  validateUuidParam,
  userControllers.activateOne
)

// Inativar usuário
userRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.manageUserAuthorization,
  validateUuidParam,
  userControllers.inactivateOne
)

// Excluir usuário
userRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.manageUserAuthorization,
  validateUuidParam,
  userControllers.deleteOne
)

// Editar usuário
userRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  userMiddlewares.manageUserAuthorization,
  validateUuidParam,
  userMiddlewares.updateOnePayloadValidation,
  userControllers.updateOne
)

export { userRouter }
