import { createManyPayloadValidation } from './createManyPayloadValidation'
import { createOneAuthorization } from './createOneAuthorization'
import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const memberMiddlewares = {
  createManyPayloadValidation,
  createOnePayloadValidation,
  createOneAuthorization,
  findManyQueryParamsValidation,
  updateOnePayloadValidation
}

export { memberMiddlewares }
