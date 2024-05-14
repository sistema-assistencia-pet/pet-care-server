import { HttpStatusCode } from 'axios'
import { type NextFunction, type Request, type Response } from 'express'

import { BaseAPIError } from '../errors'
import { MulterError } from 'multer'

const INTERNAL_SERVER_ERROR = 'Ocorreu um erro interno. Por favor, tente novamente e, caso o erro persista, entre em contato com nosso suporte.'
const MULTER_FILE_TOO_LARGE = 'O arquivo enviado é muito grande. Por favor, envie um arquivo menor (limite: 2mb).'

export async function errorMiddleware (
  error: Error | BaseAPIError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> {
  logger.error(error, error.message)

  let message = INTERNAL_SERVER_ERROR
  let statusCode = HttpStatusCode.InternalServerError
  
  switch (true) {
    case (error instanceof BaseAPIError):
      message = error.message
      statusCode = error.statusCode
      break
    case (error instanceof MulterError && error.message === 'File too large'):
      message = MULTER_FILE_TOO_LARGE
      break
    default:
      break
  }

  return res.status(statusCode).json({ message })
}
