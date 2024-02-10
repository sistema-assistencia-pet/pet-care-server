import dotenv from 'dotenv'

import { app } from './app'

dotenv.config()

const PORT = 3000

const API_RUNNING = 'API em execução na porta'

app.listen(PORT, () => {
  logger.info(`${API_RUNNING} ${PORT}`)
})
