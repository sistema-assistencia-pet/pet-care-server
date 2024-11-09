import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'

import type { FILE_FIELD_NAMES } from '../../../enums/fileFieldNames'
import { partnerServices } from '../services/partnerServices'

export async function updateFile (req: Request, res: Response): Promise<Response> {
  const FILE_SUCCESSFULLY_UPDATED = 'Arquivo atualizado com sucesso.'

  const partnerId = req.params.id
  const file = req.file as Express.Multer.File

  await partnerServices.updateFile({
    id: partnerId,
    fileName: file.filename,
    fieldName: file.fieldname as FILE_FIELD_NAMES
  })

  return res.status(HttpStatusCode.Ok).json({ message: FILE_SUCCESSFULLY_UPDATED })
}
