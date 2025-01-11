/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import type { FindManyVouchersQueryParams } from '../voucherInterfaces'
import { voucherServices } from '../services/voucherServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const VOUCHER_FOUND = 'Vouchers recuperados com sucesso.'

  const queryParams: FindManyVouchersQueryParams = {
    partnerCategoryId: typeof req.query['partner-category-id'] === 'string' ? parseInt(req.query['partner-category-id']) : undefined,
    partnerCityId: typeof req.query['partner-city-id'] === 'string' ? parseInt(req.query['partner-city-id']) : undefined,
    partnerStateId: typeof req.query['partner-state-id'] === 'string' ? parseInt(req.query['partner-state-id']) : undefined,
    clientId: req.query['client-id'] ? req.query['client-id'] as string : undefined,
    searchInput: req.query['search-input'] as string | undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined,
    take: req.query.take ? parseInt(req.query.take as string) : undefined
  }

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const { items: vouchers, totalCount } = await voucherServices.findMany(accessTokenData, queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: VOUCHER_FOUND, vouchers })
}
