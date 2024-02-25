import { HttpStatusCode } from 'axios'
import { type NextFunction, type Request, type Response } from 'express'

import { BaseAPIError } from '../errors'

const INTERNAL_SERVER_ERROR = 'Ocorreu um erro interno. Por favor, tente novamente e, caso o erro persista, entre em contato com nosso suporte.'

export const errorMiddleware = async (
  error: Error | BaseAPIError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  logger.error(error, error.message)

  const statusCode = error instanceof BaseAPIError ? error.statusCode : HttpStatusCode.InternalServerError

  const message = error instanceof BaseAPIError ? error.message : INTERNAL_SERVER_ERROR

  return res.status(statusCode).json({ message })
}
