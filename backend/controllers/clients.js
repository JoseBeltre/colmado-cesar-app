import { ClientsModel } from '../models/clients.js'
import { BadRequestError, errorHandler } from '../utils/errors.js'

export class ClientsController {
  static async getAll (req, res) {
    const { name } = req.query
    try {
      if (name) {
        const clients = await ClientsModel.getAll({ name })
        return res.status(200).json(clients)
      }
      const clients = await ClientsModel.getAll()
      return res.status(200).json(clients)
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async getOne (req, res) {
    const { id } = req.params
    const numericId = Number(id)
    try {
      if (isNaN(numericId)) {
        throw new BadRequestError('ID inválido.')
      }
      const client = await ClientsModel.getOne({ id })
      return res.status(200).json(client)
    } catch (error) {
      errorHandler(res, error)
    }
  }
}
