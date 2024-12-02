import { configureVoucherPayloadValidation } from './configureVoucherPayloadValidation'
import { createOnePayloadValidation } from './createOnePayloadValidation'
import { distributeBalancePayloadValidation } from './distributeBalancePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { rechargeBalancePayloadValidation } from './rechargeBalancePayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const clientMiddlewares = {
  configureVoucherPayloadValidation,
  createOnePayloadValidation,
  distributeBalancePayloadValidation,
  findManyQueryParamsValidation,
  rechargeBalancePayloadValidation,
  updateOnePayloadValidation
}

export { clientMiddlewares }
