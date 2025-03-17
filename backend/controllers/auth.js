import { validateEmployee } from '../schemas/user.js'
import { UserModel } from '../models/auth.js'

export class AuthController {
  static async register (req, res) {
    console.log('register')
    try {
      const result = validateEmployee(req.body)
      if (result.error) {
        return res.status(500).json({ message: JSON.parse(result.error.message) })
      }
      const newUser = await UserModel.create({ user: result.data })
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async login ({ req, res }) {

  }
}
