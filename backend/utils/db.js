import mysql from 'mysql2/promise'
import { DB_CONFIG } from '../config.js'

export const conn = await mysql.createConnection(DB_CONFIG)
