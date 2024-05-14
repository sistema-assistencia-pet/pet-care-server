import dotenv from 'dotenv'
import 'express-async-errors'

import { app } from './app'
import { systemName } from './apiConfig'

dotenv.config()

const DEFAULT_SERVER_PORT = 4000
const SERVER_PORT = process.env['SERVER_PORT'] ?? DEFAULT_SERVER_PORT

const API_RUNNING = `${systemName} API running on port:`

app.listen(SERVER_PORT, () => {
  logger.info(`${API_RUNNING} ${SERVER_PORT}`)
})
