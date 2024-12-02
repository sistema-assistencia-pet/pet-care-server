import { activateOne } from './activateOne'
import { configureVoucher } from './configureVoucher'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { distributeBalance } from './distributeBalance'
import { findMany } from './findMany'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { rechargeBalance } from './rechargeBalance'
import { updateOne } from './updateOne'

const clientControllers = {
  activateOne,
  configureVoucher,
  createOne,
  deleteOne,
  distributeBalance,
  findMany,
  findOneById,
  inactivateOne,
  rechargeBalance,
  updateOne
}

export { clientControllers }
