import { type NextFunction, type Request, type Response } from 'express'

import { BadRequestError } from '../../../errors'
import { fileFieldName } from '../../../enums/fileFieldName'

export function updateFilePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const NO_FILE_ERROR = 'Nenhum arquivo foi enviado.'
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!req.file) throw new BadRequestError(NO_FILE_ERROR)

  const INVALID_FIELDNAME_ERROR = 'O campo a ser atualizado com o arquivo enviado é inválido.'
  const fieldNames = Object.keys(fileFieldName)
  if (!fieldNames.includes(req.file.fieldname)) throw new BadRequestError(INVALID_FIELDNAME_ERROR)

  next()
}
