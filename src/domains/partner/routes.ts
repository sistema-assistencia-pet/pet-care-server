import multer from 'multer'
import { Router } from 'express'

import { checkIfIsMaster, checkIfIsMasterOrClient } from '../../middlewares/authorization.middleware'
import { multerOptionsForImage } from '../../multerOptions'
import { partnerControllers } from './controllers/partnerControllers'
import { partnerMiddlewares } from './middlewares/partnerMiddlewares'
import { validateUuidParam } from '../../middlewares/validateUuidParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'

const partnerRouter: Router = Router()

// Criar estabelecimento
partnerRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  partnerMiddlewares.createOnePayloadValidation,
  partnerControllers.createOne
)

// Detalhes de um estabelecimento
partnerRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  validateUuidParam,
  partnerControllers.findOneById
)

// Listar estabelecimentos
partnerRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  partnerMiddlewares.findManyQueryParamsValidation,
  partnerControllers.findMany
)

// Ativar estabelecimento
partnerRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  partnerControllers.activateOne
)

// Inativar estabelecimento
partnerRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  partnerControllers.inactivateOne
)

// Excluir estabelecimento
partnerRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  partnerControllers.deleteOne
)

// Editar estabelecimento
partnerRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  partnerMiddlewares.updateOnePayloadValidation,
  partnerControllers.updateOne
)

// Salvar imagem
partnerRouter.patch(
  '/:id/image',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  partnerMiddlewares.partnerIdValidation,
  multer(multerOptionsForImage).single('image'),
  partnerMiddlewares.updateFilePayloadValidation,
  partnerControllers.updateFile
)

// Salvar logo
partnerRouter.patch(
  '/:id/logo',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  partnerMiddlewares.partnerIdValidation,
  multer(multerOptionsForImage).single('logo'),
  partnerMiddlewares.updateFilePayloadValidation,
  partnerControllers.updateFile
)

export { partnerRouter }
