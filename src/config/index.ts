import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DEFAULT_USER_PASS: process.env.DEFAULT_USER_PASS,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};
