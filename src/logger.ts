import dotenv from 'dotenv'
import pino from 'pino'
import { pinoHttp } from 'pino-http'

const TERMINAL_LOG_LEVEL = 'debug'
const FILE_LOG_LEVEL = 'silent'
const HTTP_LOG_LEVEL = 'debug'

dotenv.config() // TODO: check if is necessary

const logger = pino(
  {
    name: 'server',
    level: TERMINAL_LOG_LEVEL,
    timestamp: () => {
      return `,"time":"${new Date(Date.now()).toLocaleTimeString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })}"`
    }
  },
  pino.transport({
    targets: [
      {
        target: 'pino/file',
        level: FILE_LOG_LEVEL,
        options: {
          destination: './logs/server_log.log'
        }
      },
      {
        target: 'pino-http-print',
        level: TERMINAL_LOG_LEVEL,
        options: {
          all: true,
          colorize: true
        }
      }
    ]
  })
)

const httpLogger = pinoHttp({
  level: HTTP_LOG_LEVEL,
  logger,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

global.logger = logger

export { logger, httpLogger }
