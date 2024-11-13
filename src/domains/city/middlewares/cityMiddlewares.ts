import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'

const cityMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation
}

export { cityMiddlewares }
