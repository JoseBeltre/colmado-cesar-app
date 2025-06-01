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

  static async delete (req, res) {
    const { id } = req.params
    if (!id) throw new BadRequestError('No se proveyó el ID de usuario.')
    try {
      const wasDeleted = await ClientsModel.delete({ id })
      if (!wasDeleted) {
        throw new Error('Error al eliminar el cliente.')
      }
      return res.status(200).json({ message: 'cliente eliminado correctamente.' })
    } catch (error) {
      errorHandler(res, error)
    }
  }
}
