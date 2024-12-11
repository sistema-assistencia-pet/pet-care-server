import { count } from './count'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { updateOne } from './updateOne'

const cityRepositories = {
  count,
  createOne,
  deleteOne,
  findMany,
  updateOne
}

export { cityRepositories }
