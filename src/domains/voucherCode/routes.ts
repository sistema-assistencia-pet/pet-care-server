import { Router } from 'express'

import { checkIfIsMaster } from '../../middlewares/authorization.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { voucherCodeControllers } from './controllers/voucherCodeControllers'
import { voucherCodeMiddlewares } from './middlewares/voucherCodeMiddlewares'
import { validateNumberIdParam } from '../../middlewares/validateNumberIdParam.middleware'

const voucherCodeRouter: Router = Router()

// Criar código de voucher
voucherCodeRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  voucherCodeMiddlewares.createOnePayloadValidation,
  voucherCodeControllers.createOne
)

// Listar códigos de voucher
voucherCodeRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  voucherCodeMiddlewares.findManyQueryParamsValidation,
  voucherCodeControllers.findMany
)

// Excluir voucher
voucherCodeRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMaster,
  validateNumberIdParam,
  voucherCodeControllers.deleteOne
)

export { voucherCodeRouter }
