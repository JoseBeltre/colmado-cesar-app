import jwt from 'jsonwebtoken'
import { validateEmployee } from '../schemas/employee.js'
import { UserModel } from '../models/auth.js'
import { JWT_SECRET } from '../config.js'
import { sendActivationEmail, sendActivationResponseEmail } from '../services/emailService.js'

export class AuthController {
  static async register (req, res) {
    try {
      const result = validateEmployee(req.body)
      if (!result.success) {
        return res.status(400).json({ message: JSON.parse(result.error.message) })
      }

      const newUser = await UserModel.create({ user: result.data })
      const token = jwt.sign(
        { username: newUser.username, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '1d' }
      )

      await sendActivationEmail({
        token,
        userData: {
          name: `${newUser.firstName} ${newUser.lastName}`,
          username: newUser.username,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          createdAt: new Date(),
          role: newUser.role
        }
      })

      return res.status(201).json(newUser)
    } catch (error) {
      if (error.message.includes('ya existe')) {
        return res.status(409).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Error al registrar el usuario' })
    }
  }

  static async activate (req, res) {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ message: 'No se ha proporcionado el token.' })
    }

    try {
      const { username, email } = jwt.verify(token, JWT_SECRET)
      const userActivated = await UserModel.activate({ username })

      if (!userActivated) {
        return res.status(400).json({ message: 'No se pudo activar la cuenta.' })
      }

      await sendActivationResponseEmail({ email, username, isApproved: true })
      return res.status(200).json({
        message: 'Cuenta activada correctamente.',
        username
      })
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido.' })
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado.' })
      }
      return res.status(500).json({ message: 'Error al activar la cuenta. ', error })
    }
  }

  static async deny (req, res) {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ message: 'No se ha proporcionado el token.' })
    }

    try {
      const { username, email } = jwt.verify(token, JWT_SECRET)
      const userDenied = await UserModel.deny({ username })

      if (!userDenied) {
        return res.status(400).json({ message: 'Ocurrió un error al eliminar la cuenta.' })
      }

      await sendActivationResponseEmail({ email, username, isApproved: false })
      return res.status(200).json({
        message: 'Acceso denegado, cuenta eliminada.',
        username
      })
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido.' })
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado.' })
      }
      return res.status(500).json({ message: 'Error al denegar la cuenta.' })
    }
  }

  static async login (req, res) {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({
        message: 'Usuario y contraseña son requeridos.'
      })
    }

    try {
      const user = await UserModel.login({ username, password })
      if (!user.activated) {
        return res.status(403).json({
          message: 'La cuenta no está activada.'
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        JWT_SECRET,
        { expiresIn: '8h' }
      )

      return res.status(200).json({
        token,
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email
        }
      })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}
