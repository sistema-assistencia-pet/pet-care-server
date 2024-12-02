import { createOne } from './createOne'
import { deleteOne } from './deleteOne'
import { findMany } from './findMany'
import { updateOne } from './updateOne'
import { upsertOne } from './upsertOne'

const voucherSettingsByClientRepositories = {
  createOne,
  deleteOne,
  findMany,
  updateOne,
  upsertOne
}

export { voucherSettingsByClientRepositories }
