import { conn } from '../utils/db.js'
export class ClientsModel {
  static async getAll () {
    const [result] = await conn.query('SELECT * FROM clients')
    return result
  }
}
