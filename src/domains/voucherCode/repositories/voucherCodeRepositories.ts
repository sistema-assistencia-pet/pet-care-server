import { createOne } from './createOne'
import { createOneForBulkCreation } from './createOneForBulkCreation'
import { findMany } from './findMany'
import { findOneByCode } from './findOneByCode'
import { updateOne } from './updateOne'

const voucherCodeRepositories = {
  createOne,
  createOneForBulkCreation,
  findMany,
  findOneByCode,
  updateOne
}

export { voucherCodeRepositories }
