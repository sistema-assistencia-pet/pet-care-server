import { count } from './count'
import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { updateOne } from './updateOne'
import { upsertOne } from './upsertOne'

const voucherSettingsByClientRepositories = {
  count,
  createOne,
  deleteOne,
  findMany,
  updateOne,
  upsertOne
}

export { voucherSettingsByClientRepositories }
