import { Router } from 'express'

import { checkIfIsUser } from '../../middlewares/authorization.middleware'
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
  checkIfIsUser,
  partnerMiddlewares.createOnePayloadValidation,
  partnerControllers.createOne
)

// Detalhes de um estabelecimento
partnerRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  partnerControllers.findOneById
)

// Listar estabelecimentos
partnerRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsUser,
  partnerMiddlewares.findManyQueryParamsValidation,
  partnerControllers.findMany
)

// Ativar estabelecimento
partnerRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  partnerControllers.activateOne
)

// Inativar estabelecimento
partnerRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  partnerControllers.inactivateOne
)

// Excluir estabelecimento
partnerRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  partnerControllers.deleteOne
)

// Editar estabelecimento
partnerRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  partnerMiddlewares.updateOnePayloadValidation,
  partnerControllers.updateOne
)

// Salvar imagem
partnerRouter.patch(
  '/:id/image',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  multer(multerOptionsForImage).single('image'),
  partnerMiddlewares.updateFilePayloadValidation,
  partnerControllers.updateFile
)

// Salvar logo
partnerRouter.patch(
  '/:id/logo',
  verifyAccessToken,
  checkIfIsUser,
  validateIdParam,
  multer(multerOptionsForImage).single('logo'),
  partnerMiddlewares.updateFilePayloadValidation,
  partnerControllers.updateFile
)

export { partnerRouter }
