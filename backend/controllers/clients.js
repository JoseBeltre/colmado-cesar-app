import { ClientsModel } from '../models/clients.js'

export class ClientsController {
  static async getAll (req, res) {
    try {
      const clients = await ClientsModel.getAll()
      console.log(clients)
      return res.status(200).json(clients)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getOne (req, res) {
    const { id } = req.params
    try {
      if (!id) {
        return res.status(400).json({ message: 'No se proveyó el id del usuario.' })
      } else if (typeof id !== 'number') {
        return res.status(400).json({ message: 'Provea un id válido.' })
      }
      const client = await ClientsModel.getOne({ id })
      return res.status(200).json(client)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
