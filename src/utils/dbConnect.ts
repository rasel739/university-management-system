import mongoose from "mongoose";
import logger from "./logger";
import config from "../config";





const URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.3xqxhrs.mongodb.net/?retryWrites=true&w=majority`

const dbConnect = async () => {

    try {
        if (!URI) {
            logger.error(`❌ Database URI is required`)
        }
        await mongoose.connect(URI, { dbName: 'university-management' }).then(() => {
            logger.info(`🛢 Database connected successfully`)
        })


    } catch (error: any) {
        logger.error(`❌ Error connecting:${error.message}`)
    }
};



export default dbConnect;