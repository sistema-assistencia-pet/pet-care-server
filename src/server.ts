import dotenv from 'dotenv'
import 'express-async-errors'

import { app } from './app'
import { apiName } from './apiConfig'

dotenv.config()

const DEFAULT_SERVER_PORT = 4000
// eslint-disable-next-line @typescript-eslint/dot-notation
const SERVER_PORT = process.env['SERVER_PORT'] ?? DEFAULT_SERVER_PORT

const API_RUNNING = `${apiName} API running on port:`

app.listen(SERVER_PORT, () => {
  logger.info(`${API_RUNNING} ${SERVER_PORT}`)
})
