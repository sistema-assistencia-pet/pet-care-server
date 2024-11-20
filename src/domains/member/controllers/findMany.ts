/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import type { FindManyMembersQueryParams } from '../memberInterfaces'
import { memberServices } from '../services/memberServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const MEMBERS_FOUND = 'Associados recuperados com sucesso.'

  const queryParams: FindManyMembersQueryParams = {
    take: req.query.take ? parseInt(req.query.take as string) : undefined,
    skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
    searchInput: req.query['search-input'] as string | undefined,
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined
  }

  const accessTokenData: AccessTokenData = {
    id: req.headers['request-user-id'] as string,
    clientId: req.headers['request-user-client-id'] as string,
    roleId: JSON.parse(req.headers['request-user-role-id'] as string)
  }

  const { items: members, totalCount } = await memberServices.findMany(accessTokenData, queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: MEMBERS_FOUND, members })
}
