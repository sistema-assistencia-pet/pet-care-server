import { createOne } from './createOne'
import { findMany } from './findMany'
import { updateOne } from './updateOne'
import { upsertOne } from './upsertOne'

const voucherSettingsByClientRepositories = {
  createOne,
  findMany,
  updateOne,
  upsertOne
}

export { voucherSettingsByClientRepositories }
