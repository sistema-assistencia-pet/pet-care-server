import { HttpStatusCode } from 'axios'
import type { Request, Response } from 'express'

import { BadRequestError } from '../../../errors'
import { memberServices } from '../services/memberServices'

export async function createMany (req: Request, res: Response): Promise<Response> {
  const MEMBER_SUCCESSFULLY_CREATED = 'Associados cadastrados com sucesso.'
  const FILE_NOT_FOUND = 'O arquivo .csv não foi recebido.'

  const clientId: string = req.params.clientId
  const file = req.file?.buffer

  if (file === undefined) throw new BadRequestError(FILE_NOT_FOUND)

  await memberServices.createMany(clientId, file)

  return res.status(HttpStatusCode.Created).json({ message: MEMBER_SUCCESSFULLY_CREATED })
}
