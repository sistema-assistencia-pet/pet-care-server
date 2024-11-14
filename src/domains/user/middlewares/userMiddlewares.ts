import { createOneAuthorization } from './createOneAuthorization'
import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'

const userMiddlewares = {
  createOneAuthorization,
  createOnePayloadValidation,
  findManyQueryParamsValidation
}

export { userMiddlewares }
