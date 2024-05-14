import multer from 'multer'
import path from 'node:path'
import { type Request } from 'express'

import { BadRequestError } from './errors'

export const multerOptionsForCSV = {
  storage: multer.memoryStorage(),

  fileFilter: (_req: Request, file: Express.Multer.File, callBack: multer.FileFilterCallback) => {
    const ALLOWED_MIME_TYPES = 'csv'
    const ONLY_CSV_FILES_ALLOWED = 'Apenas arquivos .csv são permitidos.'

    const isExtensionValid = path.extname(file.originalname).toLowerCase().includes(ALLOWED_MIME_TYPES)
    const isMimeTypeValid = file.mimetype.includes(ALLOWED_MIME_TYPES)

    if (!isExtensionValid || !isMimeTypeValid) callBack(new BadRequestError(ONLY_CSV_FILES_ALLOWED))

    callBack(null, true)
  },

  limits: {
    fileSize: 1024 * 1024 * 2
  }
}

export const multerOptionsForImage = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },

    filename: function (req, file, cb) {
      cb(null, req.params.id + '_' + file.fieldname + path.extname(file.originalname).toLowerCase())
    }
  }),

  fileFilter: (_req: Request, file: Express.Multer.File, callBack: multer.FileFilterCallback) => {
    const ALLOWED_EXTENSION = ['.jpg', '.png']
    const ALLOWED_MIME_TYPE = ['image/jpeg', 'image/png']
    const ONLY_IMAGE_FILES_ALLOWED = 'Apenas arquivos de imagem (.jpg ou .png) são permitidos.'

    const isExtensionValid = ALLOWED_EXTENSION.includes(path.extname(file.originalname).toLowerCase())
    const isMimeTypeValid = ALLOWED_MIME_TYPE.includes(file.mimetype)

    logger.debug(path.extname(file.originalname).toLowerCase())
    logger.debug(file.mimetype)

    if (!isExtensionValid || !isMimeTypeValid) callBack(new BadRequestError(ONLY_IMAGE_FILES_ALLOWED))

    callBack(null, true)
  },

  limits: {
    fileSize: 1024 * 1024 * 2
  }
}
