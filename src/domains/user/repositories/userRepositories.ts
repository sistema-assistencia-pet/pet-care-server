import { createOne } from './createOne'
import { deleteOneResetPasswordCode } from './deleteOneResetPasswordCode'
import { findOneByCpf } from './findOneByCpf'
import { findOneResetPasswordCode } from './findOneResetPasswordCode'
import { updateOne } from './updateOne'
import { upsertOneResetPasswordCode } from './upsertOneResetPasswordCode'

const userRepositories = {
  createOne,
  deleteOneResetPasswordCode,
  findOneByCpf,
  findOneResetPasswordCode,
  updateOne,
  upsertOneResetPasswordCode
}

export { userRepositories }
