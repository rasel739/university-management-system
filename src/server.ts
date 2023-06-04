import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

const port = config.PORT

const startServer = () => {
  try {
    app.listen(port, () => {
      logger.info(`🌐 Server is running on port:${port}`)
    })
  } catch (error: any) {
    errorLogger.error(`❌ Server error: ${error.message}`)
  }
}

startServer()
