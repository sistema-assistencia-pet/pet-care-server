import multer from 'multer'
import { Router } from 'express'

import { checkIfIsUserOrMember, checkIfIsUser } from '../../middlewares/authorization.middleware'
import { memberMiddlewares } from './middlewares/memberMiddlewares'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { multerOptionsForCSV } from '../../multerOptions'
import { memberControllers } from './controllers/memberControllers'

const memberRouter: Router = Router()

// Criar associado
memberRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  memberMiddlewares.createOnePayloadValidation,
  memberControllers.createOne
)

// Criar associados a partir de um arquivo CSV
memberRouter.post(
  '/:clientId/create-members-in-bulk',
  verifyAccessToken,
  checkIfIsUser,
  memberMiddlewares.createManyPayloadValidation,
  multer(multerOptionsForCSV).single('file'), // salva o arquivo e o disponibiliza em req.file
  memberControllers.createMany
)

// Detalhes de um associado
memberRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsUserOrMember,
  validateIdParam,
  memberControllers.findOneById
)

// Listar associados
memberRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  memberMiddlewares.findManyQueryParamsValidation,
  memberControllers.findMany
)

// Ativar associado
memberRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  memberControllers.activateOne
)

// Inativar associado
memberRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  memberControllers.inactivateOne
)

// Excluir associado
memberRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  memberControllers.deleteOne
)

// Editar associado
memberRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  memberMiddlewares.updateOnePayloadValidation,
  memberControllers.updateOne
)

export { memberRouter }
