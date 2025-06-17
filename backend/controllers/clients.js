import { UserModel } from '../models/auth.js'
import { ClientsModel } from '../models/clients.js'
import { validateClient, validatePartialClient } from '../schemas/client.js'
import { validateTransaction } from '../schemas/transaction.js'
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

  static async create (req, res) {
    try {
      const result = validateClient(req.body)
      if (!result.success) {
        throw new BadRequestError(result.error.message)
      }

      const clientExists = await ClientsModel.existsByNameOrAka({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        aka: result.data.aka
      })

      if (clientExists) {
        throw new BadRequestError('El cliente ya existe.')
      }

      const employeeExists = await UserModel.getOne({ camp: 'id', value: req.body.employeeId })
      if (!employeeExists) {
        throw new BadRequestError('El empleado especificado no existe.')
      }

      const newClient = await ClientsModel.create({ client: result.data })
      return res.status(201).json(newClient)
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async update (req, res) {
    const { id } = req.params
    try {
      if (isNaN(Number(id))) {
        throw new BadRequestError('ID debe ser un número.')
      }
      await ClientsModel.getOne({ id })
      const result = validatePartialClient(req.body)
      if (!result.success) {
        throw new BadRequestError(result.error.message)
      }

      const client = {
        id: parseInt(id),
        ...result.data
      }
      console.log(client)

      const updatedClient = await ClientsModel.update({ client })
      return res.status(200).json(updatedClient)
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    try {
      if (isNaN(Number(id))) {
        throw new BadRequestError('ID debe ser un número.')
      }
      const wasDeleted = await ClientsModel.delete({ id })
      if (!wasDeleted) {
        throw new Error('Error al eliminar el cliente.')
      }
      return res.status(200).json({ message: 'cliente eliminado correctamente.' })
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async addTransaction (req, res) {
    const { id } = req.params
    try {
      const clientId = Number(id)
      if (isNaN(clientId)) {
        throw new BadRequestError('ID debe ser número.')
      }
      await ClientsModel.getOne({ id })

      const result = await validateTransaction(req.body)
      if (!result.success) {
        throw new BadRequestError(result.error.message)
      }

      const transaction = {
        clientId: parseInt(id),
        ...result.data
      }

      const newTransaction = await ClientsModel.addTransaction({ transaction })
      return res.status(200).json(newTransaction)
    } catch (error) {
      errorHandler(res, error)
    }
  }
}
