import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import type { FindManyMembersQueryParams } from '../interfaces'
import { memberServices } from '../services/memberServices'

export async function findMany (req: Request, res: Response): Promise<Response> {
  const MEMBERS_FOUND = 'Associados recuperados com sucesso.'

  const queryParams: FindManyMembersQueryParams = {
    take: parseInt(req.query.take as string),
    skip: parseInt(req.query.skip as string),
    clientCnpj: req.query['client-cnpj'] as string | undefined,
    cpf: req.query.cpf as string | undefined,
    name: req.query.name as string | undefined,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    statusId: req.query['status-id'] ? parseInt(req.query['status-id'] as string) : undefined
  }

  const { items: members, totalCount } = await memberServices.findMany(queryParams)

  res.setHeader('x-total-count', totalCount.toString())

  return res.status(HttpStatusCode.Ok).json({ message: MEMBERS_FOUND, members })
}
