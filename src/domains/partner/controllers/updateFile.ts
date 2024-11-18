import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { fileFieldName } from '../../../enums/fileFieldName'
import { partnerServices } from '../services/partnerServices'

export async function updateFile (req: Request, res: Response): Promise<Response> {
  const FILE_SUCCESSFULLY_UPDATED = 'Arquivo atualizado com sucesso.'

  const partnerId = req.params.id
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const file = req.file as Express.Multer.File

  await partnerServices.updateFile({
    id: partnerId,
    fileName: file.filename,
    fieldName: file.fieldname as fileFieldName
  })

  return res.status(HttpStatusCode.Ok).json({ message: FILE_SUCCESSFULLY_UPDATED })
}
