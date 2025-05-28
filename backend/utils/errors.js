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

export function errorHandler (res, error) {
  const status = error.statusCode || 500
  return res.status(status).json({ message: error.message })
}
