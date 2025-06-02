import { conn } from '../utils/db.js'
import { NotFoundError } from '../utils/errors.js'
export class ClientsModel {
  static async getAll ({ name } = {}) {
    let query = `
      SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      aka,
      phone_number as phoneNumber,
      address,
      BIN_TO_UUID(employee_id) as employeeId
      FROM clients`

    const values = []

    if (name) {
      query += " WHERE CONCAT_WS(' ', first_name, last_name) LIKE ?"
      values.push(`%${name}%`)
    }
    const [result] = await conn.query(query, values)
    if (result.length === 0) {
      throw new NotFoundError('No se han encontrado clientes.')
    }
    return result
  }

  static async getOne ({ id }) {
    const [client] = await conn.query(`
      SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      aka,
      phone_number as phoneNumber,
      address,
      BIN_TO_UUID(employee_id) as employeeId
      FROM clients
      WHERE id = ? `, id)

    if (client.length === 0) {
      throw new NotFoundError('Este cliente no existe.')
    }
    return client[0]
  }

  static async existsByNameOrAka ({ firstName, lastName, aka }) {
    const [rows] = await conn.query(`
      SELECT 1 FROM clients 
      WHERE (LOWER(first_name) = LOWER(?) AND LOWER(last_name) = LOWER(?)) OR LOWER(aka) = LOWER(?)
      LIMIT 1
    `, [firstName, lastName, aka])

    return rows.length > 0
  }

  static async create ({ client }) {
    const { firstName, lastName, aka, phoneNumber, address, employeeId } = client
    const [result] = await conn.query(`
      INSERT INTO clients (first_name, last_name, aka, phone_number, address, employee_id)
      VALUES (?, ?, ?, ?, ?, UUID_TO_BIN(?))
      `, [firstName, lastName, aka, phoneNumber, address, employeeId])
    const newClient = this.getOne({ id: result.insertId })
    return newClient
  }

  static async delete ({ id }) {
    await this.getOne({ id })
    const [result] = await conn.query('DELETE FROM clients WHERE id = ?', id)
    if (result.affectedRows === 0) {
      throw new Error('Error al eliminar el cliente.')
    }
    return true
  }
}
