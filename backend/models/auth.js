import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import { DB_CONFIG, SALT_ROUNDS } from '../config.js'

const conn = await mysql.createConnection(DB_CONFIG)

export class UserModel {
  static async create ({ user }) {
    const {
      firstName,
      lastName,
      role,
      email,
      phoneNumber,
      password
    } = user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    try {
      const [result] = await conn.query('INSERT INTO employees (first_name, last_name, role, email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)', [firstName, lastName, role, email, phoneNumber, hashedPassword])
      if (result.affectedRows === 0) {
        throw new Error('No se pudo insertar el registro')
      }
      return result
    } catch (error) {
      console.error(`Error en RecordsModel.create: ${error.message}`)
      throw new Error('Error al añadir el nuevo registro a la base de datos')
    }
  }

  static async login () {

  }
}
