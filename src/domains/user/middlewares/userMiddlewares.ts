import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { manageUserAuthorization } from './manageUserAuthorization'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const userMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  manageUserAuthorization,
  updateOnePayloadValidation
}

export { userMiddlewares }
