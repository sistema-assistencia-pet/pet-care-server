import { Router } from 'express'

import { checkIfIsAdmin, checkIfIsAdminOrMember } from '../../middlewares/authorization.middleware'
import memberController from './controllers'
import memberMiddlewares from './middlewares'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const memberRouter: Router = Router()

// Criar associado
memberRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  memberMiddlewares.validateCreateOnePayload,
  memberController.createOne
)

// Detalhes de um associado
memberRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsAdminOrMember,
  validateIdParam,
  memberController.findOneById
)

// Listar associados
memberRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  memberMiddlewares.validatefindManyPayload,
  memberController.findMany
)

// Ativar associado 
memberRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  memberController.activateOne
)

// Inativar associado 
memberRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  memberController.inactivateOne
)

// Excluir associado
memberRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  memberController.deleteOne
)

export { memberRouter }
