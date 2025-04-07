import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import { DB_CONFIG, SALT_ROUNDS } from '../config.js'
import { generateUsername } from '../utils/generateUsername.js'

const conn = await mysql.createConnection(DB_CONFIG)

export class UserModel {
  static async create ({ user }) {
    const { firstName, lastName, role, email, phoneNumber, password } = user
    const username = generateUsername(firstName, lastName)

    const userExists = await UserModel.getOne({ camp: 'username', value: username })
    if (userExists !== null) {
      throw new Error('El usuario ya existe.')
    }

    const emailExists = await UserModel.getOne({ camp: 'email', value: email })
    if (emailExists !== null) {
      throw new Error('El email ya existe.')
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))

    const [rows] = await conn.query('SELECT id FROM roles WHERE role = ?', [role])
    if (rows.length <= 0) {
      throw new Error('El rol especificado parece no existir.')
    }
    const roleId = rows[0].id

    const [result] = await conn.query(
      'INSERT INTO employees (first_name, last_name, role_id, email, phone_number, password, username) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, roleId, email, phoneNumber, hashedPassword, username]
    )

    if (result.affectedRows === 0) {
      throw new Error('No se pudo insertar el registro.')
    }

    return { username, firstName, lastName, role, email, phoneNumber }
  }

  static async activate ({ username }) {
    const [result] = await conn.query(
      'UPDATE employees SET activated = TRUE WHERE username = ?',
      [username]
    )
    return result.affectedRows > 0
  }

  static async deny ({ username }) {
    const [result] = await conn.query(
      'DELETE FROM employees WHERE username = ? AND activated = FALSE',
      [username]
    )
    return result.affectedRows > 0
  }

  static async login ({ username, password }) {
    const user = await UserModel.getOne({ camp: 'username', value: username })
    if (!user || !user.activated) {
      throw new Error('El usuario no existe o no ha sido activado.')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Contraseña incorrecta')
    }

    return user
  }

  static async addRefreshToken ({ username, token, expiresAt }) {
    const [result] = await conn.query(
      'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
      [token, username, expiresAt])

    return result.affectedRows > 0
  }

  static async verifyRefreshToken ({ username, token }) {
    const [result] = await conn.query(
      'SELECT * FROM refresh_tokens WHERE username = ? AND token = ?',
      [username, token])

    if (result.length === 0) {
      return false
    }

    return result[0]
  }

  static async deleteRefreshToken ({ username, token }) {
    const [result] = await conn.query(
      'DELETE FROM refresh_tokens WHERE username = ? AND token = ?',
      [username, token])

    return result.affectedRows > 0
  }

  static async deleteAllRefreshTokens ({ username }) {
    const [result] = await conn.query(
      'DELETE FROM refresh_tokens WHERE username = ?',
      [username])

    return result.affectedRows > 0
  }

  static async getOne ({ camp, value }) {
    const allowedFields = ['id', 'username', 'email']
    if (!allowedFields.includes(camp)) {
      throw new Error('Campo no permitido.')
    }

    camp = `e.${camp}`

    const [result] = await conn.query(`
      SELECT 
        BIN_TO_UUID(e.id) AS id, 
        e.first_name, 
        e.last_name, 
        r.role AS role, 
        e.username, 
        e.email, 
        e.phone_number, 
        e.password,
        e.created_at, 
        e.activated
      FROM employees e
      JOIN roles r ON e.role_id = r.id
      WHERE ?? = ?
    `, [camp, value])

    if (result.length === 0) return null

    return {
      id: result[0].id,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      role: result[0].role,
      username: result[0].username,
      email: result[0].email,
      phoneNumber: result[0].phone_number,
      password: result[0].password,
      createdAt: result[0].created_at,
      activated: result[0].activated
    }
  }
}
