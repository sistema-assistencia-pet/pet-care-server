import { createOnePayloadValidation } from './createOnePayloadValidation'
import { distributeBalancePayloadValidation } from './distributeBalancePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { rechargeBalancePayloadValidation } from './rechargeBalancePayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const clientMiddlewares = {
  createOnePayloadValidation,
  distributeBalancePayloadValidation,
  findManyQueryParamsValidation,
  rechargeBalancePayloadValidation,
  updateOnePayloadValidation
}

export { clientMiddlewares }
