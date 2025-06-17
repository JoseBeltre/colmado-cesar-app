import { Router } from 'express'
import { ClientsController } from '../controllers/clients.js'

export const clientsRouter = Router()

// GET
clientsRouter.get('/', ClientsController.getAll)
clientsRouter.get('/:id', ClientsController.getOne)
// POST
clientsRouter.post('/', ClientsController.create)
clientsRouter.post('/:id/transaction', ClientsController.addTransaction)
// DELETE
clientsRouter.delete('/:id', ClientsController.delete)
// PATCH
clientsRouter.patch('/:id', ClientsController.update)
