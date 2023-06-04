import dotenv from 'dotenv'
import path from 'path'

// eslint-disable-next-line no-undef
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  // eslint-disable-next-line no-undef
  ENV: process.env.NODE_ENV,
  // eslint-disable-next-line no-undef
  PORT: process.env.PORT || 8000,
  // eslint-disable-next-line no-undef
  DB_USER: process.env.DB_USER,
  // eslint-disable-next-line no-undef
  DB_PASS: process.env.DB_PASS,
  // eslint-disable-next-line no-undef
  DEFAULT_USER_PASS: process.env.DEFAULT_USER_PASS,
}
