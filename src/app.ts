import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import { httpLogger } from './logger'
import { HttpStatusCode } from 'axios'

const API_RUNNING = 'API em execução.'
const URL_NOT_FOUND = 'URL não encontrada. Por favor, verifique a URL da requisição e tente novamente.'

dotenv.config()

// future imports

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(httpLogger)

app.get('/api/health-check', (_req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json(API_RUNNING)
})

app.use((_req: Request, res: Response) => {
  res.status(HttpStatusCode.NotFound).json(URL_NOT_FOUND)
})

export { app }
