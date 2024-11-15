/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { AccessTokenData } from '../../../interfaces'
import type { FindManyUsersQueryParams } from '../userInterfaces'
import { userServices } from '../services/userServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const USERS_FOUND = 'Usuários recuperados com sucesso.'

  const queryParams: FindManyUsersQueryParams = {
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

  const { items: users, totalCount } = await userServices.findMany(accessTokenData, queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: USERS_FOUND, users })
}
