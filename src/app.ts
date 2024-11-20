/* eslint-disable import/first */
import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import { HttpStatusCode } from 'axios'
import { resolve } from 'node:path'

import { apiName } from './apiConfig'
import { errorMiddleware } from './middlewares/error.middleware'
import { httpLogger } from './logger'

const API_RUNNING = `API ${apiName} em execução.`
const URL_NOT_FOUND = 'URL não encontrada. Por favor, verifique a URL da requisição e tente novamente.'

dotenv.config()

import { authRouter } from './domains/auth/routes'
import { categoryRouter } from './domains/category/routes'
import { cityRouter } from './domains/city/routes'
// import { clientRouter } from './domains/client/routes'
import { memberRouter } from './domains/member/routes'
import { partnerRouter } from './domains/partner/routes'
import { stateRouter } from './domains/state/routes'
import { userRouter } from './domains/user/routes'
import { voucherRouter } from './domains/voucher/routes'
import { voucherCodeRouter } from './domains/voucherCode/routes'

const app = express()

app.disable('x-powered-by')
app.use(cors({ exposedHeaders: ['x-total-count', 'access-token'] }))
app.use(express.json())
app.use(helmet())
app.use(httpLogger)

// Serve static files from /public folder
app.use('/api/files', express.static(resolve(__dirname, '../public')))

app.use('/api/auth', authRouter)
app.use('/api/category', categoryRouter)
app.use('/api/city', cityRouter)
// app.use('/api/client', clientRouter)
app.use('/api/member', memberRouter)
app.use('/api/partner', partnerRouter)
app.use('/api/state', stateRouter)
app.use('/api/user', userRouter)
app.use('/api/voucher', voucherRouter)
app.use('/api/voucher-code', voucherCodeRouter)

app.get('/api/health-check', (_req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json(API_RUNNING)
})

app.use((_req: Request, res: Response) => {
  res.status(HttpStatusCode.NotFound).json(URL_NOT_FOUND)
})

app.use(errorMiddleware)

export { app }
