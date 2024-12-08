import { Router } from 'express'

import { checkIfIsMaster, checkIfIsMasterOrClientOrPartner } from '../../middlewares/authorization.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { voucherCodeControllers } from './controllers/voucherCodeControllers'
import { voucherCodeMiddlewares } from './middlewares/voucherCodeMiddlewares'
import { validateNumberIdParam } from '../../middlewares/validateNumberIdParam.middleware'
import multer from 'multer'
import { multerOptionsForCSV } from '../../multerOptions'
import { validateOnePayloadValidation } from './middlewares/validateOnePayloadValidation'

const voucherCodeRouter: Router = Router()

// Criar código de voucher
voucherCodeRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  voucherCodeMiddlewares.createOnePayloadValidation,
  voucherCodeControllers.createOne
)

// Criar códigos de voucher a partir de um arquivo CSV
voucherCodeRouter.post(
  '/:voucherId/create-in-bulk',
  verifyAccessToken,
  checkIfIsMaster,
  voucherCodeMiddlewares.createManyPayloadValidation,
  multer(multerOptionsForCSV).single('file'), // salva o arquivo e o disponibiliza em req.file
  voucherCodeControllers.createMany
)

// Listar códigos de voucher
voucherCodeRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  voucherCodeMiddlewares.findManyQueryParamsValidation,
  voucherCodeControllers.findMany
)

// Excluir código de voucher
voucherCodeRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMaster,
  validateNumberIdParam,
  voucherCodeControllers.deleteOne
)

// Validar código de voucher
voucherCodeRouter.post(
  '/:code/validate',
  verifyAccessToken,
  checkIfIsMasterOrClientOrPartner,
  validateOnePayloadValidation,
  voucherCodeControllers.validateOne
)

export { voucherCodeRouter }
