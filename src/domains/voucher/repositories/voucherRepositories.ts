import { count } from './count'
import { createOne } from './createOne'
import { findMany } from './findMany'
import { findOne } from './findOne'
import { updateMany } from './updateMany'
import { updateOne } from './updateOne'

const voucherRepositories = {
  createOne,
  count,
  findOne,
  findMany,
  updateMany,
  updateOne
}

export { voucherRepositories }
