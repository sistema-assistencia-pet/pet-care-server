import { createOne } from './createOne'
import { createOneForBulkCreation } from './createOneForBulkCreation'
import { findMany } from './findMany'
import { updateOne } from './updateOne'

const voucherCodeRepositories = {
  createOne,
  createOneForBulkCreation,
  findMany,
  updateOne
}

export { voucherCodeRepositories }
