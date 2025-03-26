import jwt from 'jsonwebtoken'
import { validateEmployee } from '../schemas/employee.js'
import { UserModel } from '../models/auth.js'
import { JWT_SECRET } from '../config.js'
import { sendActivationEmail, sendActivationResponseEmail } from '../services/emailService.js'

export class AuthController {
  static async register (req, res) {
    try {
      // Validar los datos del empleado
      const result = validateEmployee(req.body)
      // Si ocurre un error al validar
      if (result.error) {
        return res.status(400).json({ message: JSON.parse(result.error.message) })
      }
      // Crear el nuevo empleado
      const newUser = await UserModel.create({ user: result.data })

      // Creacion del token de activacion
      const token = jwt.sign(
        { username: newUser.username, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '1d' }
      )

      // Enviando el correo de activacion
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
      return res.status(500).json({ message: error.message })
    }
  }

  static async activate (req, res) {
    const { token } = req.query
    if (!token) {
      res.json({ message: 'No se ha proporcionado el token.' })
    }
    try {
      // Verificar que el token sea correcto
      const decoded = jwt.verify(token, JWT_SECRET)
      const { username, email } = decoded
      // Cambiar estado a activo
      const userActivated = await UserModel.activate({ username })
      // Verificar si el usuario fue activado
      if (!userActivated) {
        return res.status(400).json({ message: 'No se pudo activar la cuenta.' })
      }
      // Enviar corre de notificacion al usuario
      await sendActivationResponseEmail({ email, username, isApproved: true })
      return res.status(200).json({ message: 'Cuenta activada correctamente.', success: true })
    } catch (error) {
      return res.status(500).json({ message: 'Token inválido o expirado.' })
    }
  }

  static async deny (req, res) {
    const { token } = req.query
    if (!token) {
      res.json({ message: 'No se ha proporcionado el token.' })
    }
    try {
      // Verificar que el token sea correcto
      const decoded = jwt.verify(token, JWT_SECRET)
      const { username, email } = decoded
      // Cambiar estado a activo
      const userActivated = await UserModel.deny({ username })
      // Verificar si el usuario fue activado
      if (!userActivated) {
        return res.status(400).json({ message: 'Ocurrió un error al eliminar la cuenta.' })
      }
      // Enviar corre de notificacion al usuario
      await sendActivationResponseEmail({ email, username, isApproved: false })
      return res.status(200).json({ message: 'Acceso denegado, cuenta eliminada.', success: true })
    } catch (error) {
      return res.status(500).json({ message: 'Token inválido o expirado.' })
    }
  }

  static async login (req, res) {

  }
}
