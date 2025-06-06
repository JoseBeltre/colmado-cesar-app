import jwt from 'jsonwebtoken'
import { validateEmployee } from '../schemas/employee.js'
import { UserModel } from '../models/auth.js'
import { ACCESS_SECRET, AUTH_SECRET, REFRESH_SECRET } from '../config.js'
import { sendActivationEmail, sendActivationResponseEmail } from '../services/emailService.js'
import { BadRequestError, ConflictError, errorHandler, ForbiddenError, UnauthorizedError } from '../utils/errors.js'

export class AuthController {
  static async register (req, res) {
    try {
      const result = validateEmployee(req.body)
      if (!result.success) {
        throw new BadRequestError(result.error.message)
      }

      const newUser = await UserModel.create({ user: result.data })
      const token = jwt.sign(
        { username: newUser.username, email: newUser.email },
        AUTH_SECRET,
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
      errorHandler(res, error)
    }
  }

  static async activate (req, res) {
    const { token } = req.body
    if (!token) {
      throw new BadRequestError('No se ha proporcionado el token.')
    }

    try {
      const { username, email } = jwt.verify(token, AUTH_SECRET)
      const userActivated = await UserModel.activate({ username })

      if (!userActivated) {
        throw new BadRequestError('No se pudo activar la cuenta.')
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
      errorHandler(res, error)
    }
  }

  static async deny (req, res) {
    const { token } = req.body
    if (!token) {
      throw new BadRequestError('No se ha proporcionado el token.')
    }

    try {
      const { username, email } = jwt.verify(token, AUTH_SECRET)
      const userDenied = await UserModel.deny({ username })

      if (!userDenied) {
        throw new BadRequestError('No se pudo eliminar la cuenta, el usuario está activo o no existe.')
      }

      await sendActivationResponseEmail({ email, username, isApproved: false })
      return res.status(204).json({
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
      errorHandler(res, error)
    }
  }

  static async login (req, res) {
    const { username, password } = req.body
    if (!username || !password) {
      throw new BadRequestError('El usuario y contraseña son necesarios.')
    }

    try {
      const user = await UserModel.login({ username, password })
      if (!user.activated) {
        throw new ConflictError('La cuenta aún no ha sido activada.')
      }

      const refreshToken = jwt.sign(
        {
          username,
          role: user.role
        },
        REFRESH_SECRET,
        { expiresIn: '30d' }
      )

      const expiresInDays = 30
      const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)

      const tokenResult = await UserModel.addRefreshToken({ username, token: refreshToken, expiresAt })
      if (!tokenResult) throw new Error('Error al iniciar sesión.')

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // false para desarrollo
        sameSite: 'Strict',
        maxAge: expiresInDays * 24 * 60 * 60 * 1000
      })

      const accessToken = jwt.sign(
        {
          username,
          role: user.role
        },
        ACCESS_SECRET,
        { expiresIn: '15m' }
      )

      return res.status(200).json({
        token: accessToken,
        user: {
          username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email
        }
      })
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async refreshToken (req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      throw new UnauthorizedError('No se proveyó el token de refresco.')
    }
    try {
      const { username, role } = jwt.verify(refreshToken, REFRESH_SECRET)

      const data = await UserModel.verifyRefreshToken({ username, token: refreshToken })
      if (!data || new Date(data.expires_at) < new Date()) {
        res.clearCookie('refreshToken', {
          httpOnly: true,
          secure: false, // true en producción
          sameSite: 'Strict'
        })
        throw new ForbiddenError('El token no existe o es inválido.')
      }

      const accessToken = jwt.sign(
        {
          username,
          role
        },
        ACCESS_SECRET,
        { expiresIn: '15s' }
      )

      return res.status(200).json({ token: accessToken })
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async logout (req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      throw new UnauthorizedError('No se proveyó el token de refresco.')
    }
    try {
      const { username } = jwt.verify(refreshToken, REFRESH_SECRET)
      const deleteToken = await UserModel.deleteRefreshToken({ username, token: refreshToken })

      if (!deleteToken) {
        throw new Error('Error al cerrar sesión')
      }
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // true en producción
        sameSite: 'Strict'
      })
      return res.status(200).json({ message: 'Sesión cerrada exitosamente.' })
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async logoutAllSessions (req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      throw new UnauthorizedError('No se proveyó el token de refresco.')
    }
    try {
      const { username } = jwt.verify(refreshToken, REFRESH_SECRET)
      const deleteToken = await UserModel.deleteAllRefreshTokens({ username })

      if (!deleteToken) {
        throw new Error('Error al cerrar sesión')
      }
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // true en producción
        sameSite: 'Strict'
      })
      return res.status(200).json({ message: 'Sesión cerrada exitosamente.' })
    } catch (error) {
      errorHandler(res, error)
    }
  }

  static async verifyAccessToken (req, res) {
    try {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      if (!token) {
        throw new UnauthorizedError('No se proveyó el token de acceso.')
      }

      const decoded = jwt.verify(token, ACCESS_SECRET)

      return res.status(200).json({ message: 'Token válido.', user: decoded })
    } catch (error) {
      errorHandler(res, error)
    }
  }
  // TODO: combine both Logouts in single function
}
