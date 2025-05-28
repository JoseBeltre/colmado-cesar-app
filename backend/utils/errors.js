export class NotFoundError extends Error {
  constructor (message = 'Recurso no encontrado') {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

export class BadRequestError extends Error {
  constructor (message = 'Petición inválida.') {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 400
  }
}

export class ConflictError extends Error {
  constructor (message = 'Se generaron conflictos en la petición.') {
    super(message)
    this.name = 'ConflictError'
    this.statusCode = 409
  }
}

export class ForbiddenError extends Error {
  constructor (message = 'Solicitud procesada correctamente, pero faltan permisos.') {
    super(message)
    this.name = 'ForbiddenError'
    this.statusCode = 403
  }
}

export class UnauthorizedError extends Error {
  constructor (message = 'No tienes autorización para efectuar esta acción.') {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}

export function errorHandler (res, error) {
  const status = error.statusCode || 500
  return res.status(status).json({ message: error.message })
}
