import dotenv from 'dotenv'
import 'express-async-errors'

import { app } from './app'
import { getEnvironmentVariable } from './utils/getEnvironmentVariable'

dotenv.config()

const PORT = 4000

const API_RUNNING = 'API em execução na porta'

logger.debug({}, getEnvironmentVariable('DATABASE_URL'))

app.listen(PORT, () => {
  logger.info(`${API_RUNNING} ${PORT}`)
})
