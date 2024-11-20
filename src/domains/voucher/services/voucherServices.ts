import { activateOne } from './activateOne'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { updateOne } from './updateOne'

const voucherServices = {
  activateOne,
  createOne,
  deleteOne,
  findOneById,
  findMany,
  inactivateOne,
  updateOne
}

export { voucherServices }
