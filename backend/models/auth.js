import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import { DB_CONFIG, SALT_ROUNDS } from '../config.js'
import { generateUsername } from '../utils/generateUsername.js'

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

    // Creando nombre de usuario
    const username = generateUsername(firstName, lastName)

    // Verificar si el usuario ya existe
    const userExists = await UserModel.getOne({ camp: 'username', value: username })
    if (userExists !== null) {
      throw new Error('El usuario ya existe.')
    }

    // Verificar si el email ya existe
    const emailExists = await UserModel.getOne({ camp: 'email', value: email })
    if (emailExists !== null) {
      throw new Error('El email ya existe.')
    }

    try {
      // Hasheando la contrasena
      const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))

      // obtener el id del rol
      const [rows] = await conn.query('SELECT id FROM roles WHERE role = ?', [role])
      if (rows.length <= 0) {
        throw new Error('El rol especificado parece no existir.')
      }
      const roleId = rows[0].id

      // Insertando nuevo empleado
      const [result] = await conn.query('INSERT INTO employees (first_name, last_name, role_id, email, phone_number, password, username) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, roleId, email, phoneNumber, hashedPassword, username])
      // Verificar si se inserto el registro
      if (result.affectedRows === 0) {
        throw new Error('No se pudo insertar el registro.')
      }

      return {
        username,
        firstName,
        lastName,
        role,
        email,
        phoneNumber
      }
    } catch (error) {
      console.error(`Error en UserModel.create: ${error.message}`)
      throw new Error('Error al añadir el nuevo registro a la base de datos')
    }
  }

  static async activate ({ username }) {
    try {
      const [result] = await conn.query(
        'UPDATE employees SET activated = TRUE WHERE username = ?',
        [username])
      return result.affectedRows > 0
    } catch (error) {
      console.error(`Error en UserModel.activate: ${error.message}`)
      throw new Error(`Error al activar el usuario: ${username}`)
    }
  }

  static async deny ({ username }) {
    try {
      const [result] = await conn.query(
        'DELETE FROM employees WHERE username = ? AND activated = FALSE',
        [username])
      return result.affectedRows > 0
    } catch (error) {
      console.error(`Error en UserModel.deny: ${error.message}`)
      throw new Error(`Error al eliminar el usuario: ${username}`)
    }
  }

  static async login () {

  }

  static async getOne ({ camp, value }) {
    const allowedFields = ['id', 'username', 'email']
    if (!allowedFields.includes(camp)) {
      throw new Error('Campo no permitido.')
    }
    // Formateamos el campo para que funcione la consulta
    camp = `e.${camp}`

    // Realizamos la consulta
    const [result] = await conn.query(`
      SELECT BIN_TO_UUID(e.id) AS id, e.first_name, e.last_name, r.role AS role, e.username, e.email, e.phone_number, e.created_at, e.activated
      FROM employees e
      JOIN roles r ON e.role_id = r.id
      WHERE ?? = ?
      `, [camp, value])

    // Si no hay resultados, retornamos null
    if (result.length === 0) {
      return null
    }
    // Retornamos un objeto con los datos del usuario

    return {
      id: result[0].id,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      role: result[0].role,
      username: result[0].username,
      email: result[0].email,
      phoneNumber: result[0].phone_number,
      createdAt: result[0].created_at,
      activated: result[0].activated
    }
  }
}
