import { activateOne } from './activateOne'
import { createMany } from './createMany'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { updateOne } from './updateOne'

const memberServices = {
  activateOne,
  createMany,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne,
  updateOne
}

export { memberServices }
