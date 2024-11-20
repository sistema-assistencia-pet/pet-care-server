import { checkIfIsSameClientId } from './checkIfIsSameClientId'
import { checkIfIsSameMemberId } from './checkIfIsSameMemberId'
import { createManyPayloadValidation } from './createManyPayloadValidation'
import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const memberMiddlewares = {
  checkIfIsSameClientId,
  checkIfIsSameMemberId,
  createManyPayloadValidation,
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  updateOnePayloadValidation
}

export { memberMiddlewares }
