import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { rechargeBalancePayloadValidation } from './rechargeBalancePayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const clientMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  rechargeBalancePayloadValidation,
  updateOnePayloadValidation
}

export { clientMiddlewares }
