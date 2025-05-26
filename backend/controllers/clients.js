import { ClientsModel } from '../models/clients.js'

export class ClientsController {
  static async getAll (req, res) {
    try {
      const clients = await ClientsModel.getAll()
      console.log(clients)
      return res.status(200).json(clients)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: error.message })
    }
  }
}
