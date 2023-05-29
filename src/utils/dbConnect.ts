import mongoose from "mongoose";
import logger from "./logger";
import config from "../config";





const URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.3xqxhrs.mongodb.net/?retryWrites=true&w=majority`

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

const dbConnect = async () => {

    try {
        if (!URI) {
            logger.error(`❌ Database URI is required`)
        }
        await mongoose.connect(URI, { dbName: 'university-management' }).then(() => {
            logger.info(`🛢 Database connected successfully`)
        })


    } catch (error) {
        logger.error(`❌ Error connecting:${reportError({ message: getErrorMessage(error) })}`)
    }
};



export default dbConnect;