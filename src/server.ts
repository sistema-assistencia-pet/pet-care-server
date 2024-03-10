import dotenv from 'dotenv'
import 'express-async-errors'

import { app } from './app'
import { getEnvironmentVariable } from './utils/getEnvironmentVariable'

dotenv.config()

const PORT = 4000

const API_RUNNING = 'API em execução na porta'

const DB_URL = getEnvironmentVariable('DB_URL')

logger.debug({ DB_URL }, 'URL do DB')

app.listen(PORT, () => {
  logger.info(`${API_RUNNING} ${PORT}`)
})
