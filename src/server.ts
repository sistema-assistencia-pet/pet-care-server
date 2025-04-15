import dotenv from 'dotenv'
import 'express-async-errors'

import { app } from './app'
import { API_NAME } from './apiConfig'

dotenv.config()

const DEFAULT_SERVER_PORT = 8100
// eslint-disable-next-line @typescript-eslint/dot-notation
const SERVER_PORT = process.env['SERVER_PORT'] ?? DEFAULT_SERVER_PORT

const API_RUNNING = `${API_NAME} API running on port:`

app.listen(SERVER_PORT, () => {
  logger.info(`${API_RUNNING} ${SERVER_PORT}`)
})
