import { createManyPayloadValidation } from './createManyPayloadValidation'
import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'

const voucherCodeMiddlewares = {
  createManyPayloadValidation,
  createOnePayloadValidation,
  findManyQueryParamsValidation
}

export { voucherCodeMiddlewares }
