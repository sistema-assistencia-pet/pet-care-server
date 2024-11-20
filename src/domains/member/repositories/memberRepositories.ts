import { count } from './count'
import { createOne } from './createOne'
import { createOneForBulkCreation } from './createOneForBulkCreation'
import { deleteOneResetPasswordCode } from './deleteOneResetPasswordCode'
import { findMany } from './findMany'
import { findOneByCpf } from './findOneByCpf'
import { findOne } from './findOne'
import { findOneResetPasswordCode } from './findOneResetPasswordCode'
import { updateMany } from './updateMany'
import { updateOne } from './updateOne'
import { upsertOneResetPasswordCode } from './upsertOneResetPasswordCode'

const memberRepositories = {
  count,
  createOne,
  createOneForBulkCreation,
  deleteOneResetPasswordCode,
  findMany,
  findOneByCpf,
  findOne,
  findOneResetPasswordCode,
  updateMany,
  updateOne,
  upsertOneResetPasswordCode
}

export { memberRepositories }
