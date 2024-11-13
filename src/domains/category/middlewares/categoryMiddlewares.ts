import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const categoryMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  updateOnePayloadValidation
}

export { categoryMiddlewares }
