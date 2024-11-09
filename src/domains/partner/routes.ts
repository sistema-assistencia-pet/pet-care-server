import { Router } from 'express'

import { checkIfIsSystemUser } from '../../middlewares/authorization.middleware'
import { partnerControllers } from './controllers/partnerControllers'
import { partnerMiddlewares } from './middlewares/partnerMiddlewares'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import multer from 'multer'
import { multerOptionsForImage } from '../../multerOptions'

const partnerRouter: Router = Router()

// Criar estabelecimento
partnerRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsSystemUser,
  partnerMiddlewares.createOnePayloadValidation,
  partnerControllers.createOne
)

// Detalhes de um estabelecimento
partnerRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  partnerControllers.findOneById
)

// Listar estabelecimentos
partnerRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsSystemUser,
  partnerMiddlewares.findManyQueryParamsValidation,
  partnerControllers.findMany
)

// Ativar estabelecimento
partnerRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  partnerControllers.activateOne
)

// Inativar estabelecimento
partnerRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  partnerControllers.inactivateOne
)

// Excluir estabelecimento
partnerRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  partnerControllers.deleteOne
)

// Editar estabelecimento
partnerRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  partnerMiddlewares.updateOnePayloadValidation,
  partnerControllers.updateOne
)

// Salvar imagem
partnerRouter.patch(
  '/:id/image',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  multer(multerOptionsForImage).single('image'),
  partnerMiddlewares.updateFilePayloadValidation,
  partnerControllers.updateFile
)

// Salvar logo
partnerRouter.patch(
  '/:id/logo',
  verifyAccessToken,
  checkIfIsSystemUser,
  validateIdParam,
  multer(multerOptionsForImage).single('logo'),
  partnerMiddlewares.updateFilePayloadValidation,
  partnerControllers.updateFile
)

export { partnerRouter }
