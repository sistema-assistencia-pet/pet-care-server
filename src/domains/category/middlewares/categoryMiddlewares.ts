import { createOnePayloadValidation } from './createOnePayloadValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const categoryMiddlewares = {
  createOnePayloadValidation,
  updateOnePayloadValidation
}

export { categoryMiddlewares }
