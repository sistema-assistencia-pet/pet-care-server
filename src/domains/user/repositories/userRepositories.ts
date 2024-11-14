import { count } from './count'
import { createOne } from './createOne'
import { deleteOneResetPasswordCode } from './deleteOneResetPasswordCode'
import { findMany } from './findMany'
import { findOneByCpf } from './findOneByCpf'
import { findOneById } from './findOneById'
import { findOneResetPasswordCode } from './findOneResetPasswordCode'
import { updateOne } from './updateOne'
import { upsertOneResetPasswordCode } from './upsertOneResetPasswordCode'

const userRepositories = {
  count,
  createOne,
  deleteOneResetPasswordCode,
  findOneByCpf,
  findOneById,
  findOneResetPasswordCode,
  findMany,
  updateOne,
  upsertOneResetPasswordCode
}

export { userRepositories }
