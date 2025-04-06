import { createOnePayloadValidation } from './createOnePayloadValidation'
import { findManyQueryParamsValidation } from './findManyQueryParamsValidation'
import { redeemOneByMasterPayloadValidation } from './redeemOneByMasterPayloadValidation'
import { replaceResquestData } from './replaceResquestData'
import { updateOnePayloadValidation } from './updateOnePayloadValidation'

const voucherMiddlewares = {
  createOnePayloadValidation,
  findManyQueryParamsValidation,
  redeemOneByMasterPayloadValidation,
  replaceResquestData,
  updateOnePayloadValidation
}

export { voucherMiddlewares }
