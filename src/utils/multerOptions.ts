import multer from 'multer'
import path from 'path'
import { Request } from 'express'

import { BadRequestError } from '../errors'

export const multerOptions = {
  storage: multer.memoryStorage(),

  fileFilter: (_req: Request, file: Express.Multer.File, callBack: multer.FileFilterCallback) => {
    const ALLOWED_MIME_TYPES = /csv/
    const ONLY_CSV_FILES_ALLOWED = 'Apenas arquivos .csv são permitidos.'

    const isExtensionValid = ALLOWED_MIME_TYPES.test(path.extname(file.originalname).toLowerCase())
    const isMimeTypeValid = ALLOWED_MIME_TYPES.test(file.mimetype)

    if (!isExtensionValid || !isMimeTypeValid) callBack(new BadRequestError(ONLY_CSV_FILES_ALLOWED))

    callBack(null, true)
  },

  limits: {
    fileSize: 1024 * 1024 * 2,
  }
}
