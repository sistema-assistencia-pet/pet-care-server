import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const cityMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  updateOnePayloadValidation
}

export { cityMiddlewares }
