import { Router } from 'express'

import { categoryControllers } from './controllers/categoryControllers'
import { categoryMiddlewares } from './middlewares/categoryMiddlewares'
import { checkIfIsMaster, checkIfIsMasterOrClient } from '../../middlewares/authorization.middleware'
import { validateNumberIdParam } from '../../middlewares/validateNumberIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const categoryRouter: Router = Router()

// Listar categorias
categoryRouter.get(
  '/',
  verifyAccessToken,
  categoryControllers.findAll
)

// Criar categoria
categoryRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  categoryMiddlewares.createOnePayloadValidation,
  categoryControllers.createOne
)

// Excluir categoria
categoryRouter.delete(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateNumberIdParam,
  categoryControllers.deleteOne
)

// Editar categoria
categoryRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateNumberIdParam,
  categoryMiddlewares.updateOnePayloadValidation,
  categoryControllers.updateOne
)

export { categoryRouter }
