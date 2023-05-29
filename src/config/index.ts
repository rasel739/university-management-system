import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') });



export default {
    PORT: process.env.PORT || 8000,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
}


