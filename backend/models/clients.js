import { conn } from '../utils/db.js'
export class ClientsModel {
  static async getAll () {
    const [result] = await conn.query(
      `SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      aka,
      phone_number as phoneNumber,
      address,
      BIN_TO_UUID(employee_id) as employeeId
      FROM clients`)
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
      throw new Error('Este cliente no existe.')
    }
    return client[0]
  }
}
