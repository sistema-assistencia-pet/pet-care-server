import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateFilePayloadValidation } from './updateFilePayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const partnerMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  updateFilePayloadValidation,
  updateOnePayloadValidation
}

export { partnerMiddlewares }
