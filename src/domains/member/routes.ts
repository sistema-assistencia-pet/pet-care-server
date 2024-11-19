import multer from 'multer'
import { Router } from 'express'

import { checkIfIsMasterOrClientOrMember, checkIfIsMasterOrClient } from '../../middlewares/authorization.middleware'
import { memberMiddlewares } from './middlewares/memberMiddlewares'
import { validateUuidParam } from '../../middlewares/validateUuidParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { multerOptionsForCSV } from '../../multerOptions'
import { memberControllers } from './controllers/memberControllers'

const memberRouter: Router = Router()

// Criar associado
memberRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  memberMiddlewares.createOnePayloadValidation,
  memberControllers.createOne
)

// Criar associados a partir de um arquivo CSV
memberRouter.post(
  '/:clientId/create-members-in-bulk',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  memberMiddlewares.createManyPayloadValidation,
  multer(multerOptionsForCSV).single('file'), // salva o arquivo e o disponibiliza em req.file
  memberControllers.createMany
)

// Detalhes de um associado
memberRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterOrClientOrMember,
  validateUuidParam,
  memberControllers.findOneById
)

// Listar associados
memberRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  memberMiddlewares.findManyQueryParamsValidation,
  memberControllers.findMany
)

// Ativar associado
memberRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  memberControllers.activateOne
)

// Inativar associado
memberRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  memberControllers.inactivateOne
)

// Excluir associado
memberRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  memberControllers.deleteOne
)

// Editar associado
memberRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  memberMiddlewares.updateOnePayloadValidation,
  memberControllers.updateOne
)

export { memberRouter }
