import { Router } from 'express'

import { checkIfIsAdmin } from '../../middlewares/authorization.middleware'
import partnerController from './controllers'
import partnerMiddlewares from './middlewares'
import { validateIdParam } from '../../middlewares/validateIdParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import multer from 'multer'
import { multerOptionsForImage } from '../../multerOptions'

const partnerRouter: Router = Router()

// Criar estabelecimento
partnerRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  partnerMiddlewares.validateCreateOnePayload,
  partnerController.createOne
)

// Detalhes de um estabelecimento
partnerRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerController.findOneById
)

// Listar estabelecimentos
partnerRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsAdmin,
  partnerMiddlewares.validateFindManyQueryParams,
  partnerController.findMany
)

// Ativar estabelecimento
partnerRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerController.activateOne
)

// Inativar estabelecimento
partnerRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerController.inactivateOne
)

// Excluir estabelecimento
partnerRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerController.deleteOne
)

// Editar estabelecimento
partnerRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerMiddlewares.validateUpdateOnePayload,
  partnerController.updateOne
)

// Salvar imagem
partnerRouter.patch(
  '/:id/image',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerMiddlewares.validateUpdateFilePayload,
  partnerController.updateFile,
  multer(multerOptionsForImage).single('image')
)

// Salvar logo
partnerRouter.patch(
  '/:id/logo',
  verifyAccessToken,
  checkIfIsAdmin,
  validateIdParam,
  partnerMiddlewares.validateUpdateFilePayload,
  partnerController.updateFile,
  multer(multerOptionsForImage).single('logo')
)

export { partnerRouter }
