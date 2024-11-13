import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'

const categoryMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation
}

export { categoryMiddlewares }
