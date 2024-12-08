import { createMany } from './createMany'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { validateOne } from './validateOne'

const voucherCodeControllers = {
  createMany,
  createOne,
  deleteOne,
  findMany,
  validateOne
}

export { voucherCodeControllers }
