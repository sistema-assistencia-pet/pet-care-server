import { activateOne } from './activateOne'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { rechargeBalance } from './rechargeBalance'
import { updateOne } from './updateOne'

const clientControllers = {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne,
  rechargeBalance,
  updateOne
}

export { clientControllers }
