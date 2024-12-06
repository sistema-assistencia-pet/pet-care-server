import { activateOne } from './activateOne'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { findManyForMember } from './findManyForMember'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { updateOne } from './updateOne'

const voucherControllers = {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findManyForMember,
  findOneById,
  inactivateOne,
  updateOne
}

export { voucherControllers }
