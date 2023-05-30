import app from './app';
import config from './config';
import logger from './utils/logger';


const port = config.PORT



const startServer = () => {

    try {

        app.listen(port, () => {

            logger.info(`🌐 Server is running on port:${port}`)
        })

    } catch (error: any) {
        logger.error(`❌ Server error: ${error.message}`)
    }
};


startServer();