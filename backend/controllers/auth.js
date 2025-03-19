import { validateEmployee } from '../schemas/employee.js'
import { UserModel } from '../models/auth.js'

export class AuthController {
  static async register (req, res) {
    try {
      // Validar los datos del empleado
      const result = validateEmployee(req.body)
      // Si ocurre un error al validar
      if (result.error) {
        return res.status(500).json({ message: JSON.parse(result.error.message) })
      }
      // Crear el nuevo empleado
      const newUser = await UserModel.create({ user: result.data })
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async login ({ req, res }) {

  }
}
