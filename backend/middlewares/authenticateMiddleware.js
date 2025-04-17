import jwt from 'jsonwebtoken'
import { ACCESS_SECRET } from '../config.js'

export function authenticateTokenMiddleware (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'No se proveyó un token.' })

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' })

    req.user = user
  })

  next()
}
