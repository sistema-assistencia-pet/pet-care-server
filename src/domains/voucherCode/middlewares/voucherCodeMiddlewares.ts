import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'

const voucherCodeMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation
}

export { voucherCodeMiddlewares }
