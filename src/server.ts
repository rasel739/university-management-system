import app from './app';
import config from './config';
import logger from './utils/logger';


const port = config.PORT

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

const startServer = () => {

    try {

        app.listen(port, () => {

            logger.info(`🌐 Server is running on port:${port}`)
        })

    } catch (error) {
        logger.error(`❌ Server error: ${reportError({ message: getErrorMessage(error) })}`)
    }
};


startServer();