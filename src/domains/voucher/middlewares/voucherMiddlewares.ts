import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const voucherMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  updateOnePayloadValidation
}

export { voucherMiddlewares }
