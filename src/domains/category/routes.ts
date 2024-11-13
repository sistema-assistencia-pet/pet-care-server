import { Router } from 'express'

import { categoryControllers } from './controllers/categoryControllers'
import { categoryMiddlewares } from './middlewares/categoryMiddlewares'
import { checkIfIsMasterUser, checkIfIsUser } from '../../middlewares/authorization.middleware'
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
  checkIfIsUser,
  categoryMiddlewares.createOnePayloadValidation,
  categoryControllers.createOne
)

// Excluir categoria
categoryRouter.delete(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterUser,
  validateNumberIdParam,
  categoryControllers.deleteOne
)

// Editar categoria
categoryRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterUser,
  validateNumberIdParam,
  categoryMiddlewares.updateOnePayloadValidation,
  categoryControllers.updateOne
)

export { categoryRouter }
