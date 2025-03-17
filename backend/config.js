export const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'colmado_cesar'
}

export const {
  PORT = 1234,
  SALT_ROUNDS = 10
} = process.env
