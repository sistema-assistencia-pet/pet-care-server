import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const clientMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  updateOnePayloadValidation
}

export { clientMiddlewares }
