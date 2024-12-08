import { validateOne } from './validateOne'
import { createMany } from './createMany'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'

const voucherCodeServices = {
  createMany,
  createOne,
  deleteOne,
  findMany,
  validateOne
}

export { voucherCodeServices }
