import { count } from './count'
import { createOne } from './createOne'
import { deleteOneResetPasswordCode } from './deleteOneResetPasswordCode'
import { findMany } from './findMany'
import { findOne } from './findOne'
import { findOneResetPasswordCode } from './findOneResetPasswordCode'
import { updateOne } from './updateOne'
import { upsertOneResetPasswordCode } from './upsertOneResetPasswordCode'

const userRepositories = {
  count,
  createOne,
  deleteOneResetPasswordCode,
  findOne,
  findOneResetPasswordCode,
  findMany,
  updateOne,
  upsertOneResetPasswordCode
}

export { userRepositories }
