import { activateOne } from './activateOne'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { findOneById } from './findOneById'
import { inactivateOne } from './inactivateOne'
import { updateFile } from './updateFile'
import { updateOne } from './updateOne'

const partnerServices = {
  activateOne,
  createOne,
  deleteOne,
  findMany,
  findOneById,
  inactivateOne,
  updateOne,
  updateFile
}

export { partnerServices }
