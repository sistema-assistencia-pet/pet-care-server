import { configureVoucherPayloadValidation } from './configureVoucherPayloadValidation'
import { createOnePayloadValidation } from './createOnePayloadValidation'
import { distributeBalancePayloadValidation } from './distributeBalancePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { findOneByIdAuthorization } from './findOneByIdAuthorizationMiddleware'
import { rechargeBalancePayloadValidation } from './rechargeBalancePayloadValidation'
import { removeVoucherConfigurationPayloadValidation } from './removeVoucherConfigurationPayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const clientMiddlewares = {
  configureVoucherPayloadValidation,
  createOnePayloadValidation,
  distributeBalancePayloadValidation,
  findManyQueryParamsValidation,
  findOneByIdAuthorization,
  rechargeBalancePayloadValidation,
  removeVoucherConfigurationPayloadValidation,
  updateOnePayloadValidation
}

export { clientMiddlewares }
