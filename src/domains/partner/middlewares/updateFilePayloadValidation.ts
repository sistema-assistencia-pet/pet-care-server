import { type NextFunction, type Request, type Response } from 'express'

import { BadRequestError } from '../../../errors'
import { FILE_FIELD_NAMES } from '../../../enums/fileFieldNames'

export function updateFilePayloadValidation (req: Request, _res: Response, next: NextFunction): void {
  const NO_FILE_ERROR = 'Nenhum arquivo foi enviado.'
  if (!req.file) throw new BadRequestError(NO_FILE_ERROR)

  const INVALID_FIELDNAME_ERROR = 'O campo a ser atualizado com o arquivo enviado é inválido.'
  const feldNames = Object.keys(FILE_FIELD_NAMES)
  if (!feldNames.includes(req.file.fieldname)) throw new BadRequestError(INVALID_FIELDNAME_ERROR)

  next()
}
