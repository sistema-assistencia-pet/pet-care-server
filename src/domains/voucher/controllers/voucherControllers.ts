import { activateOne } from './activateOne'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { findManyForMember } from './findManyForMember'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { redeemOne } from './redeemOne'
import { updateOne } from './updateOne'

const voucherControllers = {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findManyForMember,
  findOneById,
  inactivateOne,
  redeemOne,
  updateOne
}

export { voucherControllers }
