import { Router } from 'express'

import { checkIfIsMaster, checkIfIsMasterOrClient, checkIfIsMasterOrClientOrMember } from '../../middlewares/authorization.middleware'
import { validateUuidParam } from '../../middlewares/validateUuidParam.middleware'
import { verifyAccessToken } from '../../middlewares/authentication.middleware'
import { voucherControllers } from './controllers/voucherControllers'
import { voucherMiddlewares } from './middlewares/voucherMiddlewares'

const voucherRouter: Router = Router()

// Criar voucher
voucherRouter.post(
  '/',
  verifyAccessToken,
  checkIfIsMaster,
  voucherMiddlewares.createOnePayloadValidation,
  voucherControllers.createOne
)

// Listar vouchers para associados (precisa estar acima do findOneById)
voucherRouter.get(
  '/member',
  verifyAccessToken,
  checkIfIsMasterOrClientOrMember,
  voucherMiddlewares.findManyQueryParamsValidation,
  voucherControllers.findManyForMember
)

// Detalhes de um voucher
voucherRouter.get(
  '/:id',
  verifyAccessToken,
  checkIfIsMasterOrClientOrMember,
  validateUuidParam,
  voucherControllers.findOneById
)

// Listar vouchers
voucherRouter.get(
  '/',
  verifyAccessToken,
  checkIfIsMasterOrClient,
  voucherMiddlewares.findManyQueryParamsValidation,
  voucherControllers.findMany
)

// Resgatar voucher
voucherRouter.post(
  '/:id/redeem',
  verifyAccessToken,
  checkIfIsMasterOrClientOrMember,
  validateUuidParam,
  voucherControllers.redeemOne
)

// Ativar voucher
voucherRouter.patch(
  '/:id/activate',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  voucherControllers.activateOne
)

// Inativar voucher
voucherRouter.patch(
  '/:id/inactivate',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  voucherControllers.inactivateOne
)

// Excluir voucher
voucherRouter.patch(
  '/:id/delete',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  voucherControllers.deleteOne
)

// Editar voucher
voucherRouter.patch(
  '/:id',
  verifyAccessToken,
  checkIfIsMaster,
  validateUuidParam,
  voucherMiddlewares.updateOnePayloadValidation,
  voucherControllers.updateOne
)

export { voucherRouter }
