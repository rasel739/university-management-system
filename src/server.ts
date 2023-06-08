import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

const port = config.PORT;

process.on('uncaughtException', error => {
  errorLogger.error('uncaught exception is detected', error);
  process.exit(1);
});

let server: Server;

const startServer = async () => {
  try {
    server = app.listen(port, () => {
      logger.info(`🌐 Server is running on port:${port}`);
    });
  } catch (error: any) {
    errorLogger.error(`❌ Server error: ${error.message}`);
  }

  process.on('unhandledRejection', error => {
    logger.info('Unhandled rejection error and closed server');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

startServer();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
