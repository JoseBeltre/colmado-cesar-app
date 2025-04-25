import 'dotenv/config'

export const {
  PORT = 1234,
  SALT_ROUNDS,
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PORT = 3306,
  DB_PASSWORD = '',
  DB_DATABASE,
  DB_NAME,
  EMAIL_USER,
  EMAIL_PASSWORD,
  ADMIN_EMAIL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE = true,
  AUTH_SECRET,
  REFRESH_SECRET,
  ACCESS_SECRET,
  WEB_URL
} = process.env

export const DB_CONFIG = {
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME
}
