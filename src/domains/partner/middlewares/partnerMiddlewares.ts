import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { partnerIdValidation } from './partnerIdValidation'
import { updateFilePayloadValidation } from './updateFilePayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const partnerMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  partnerIdValidation,
  updateFilePayloadValidation,
  updateOnePayloadValidation
}

export { partnerMiddlewares }
