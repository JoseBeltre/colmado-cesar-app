import { Router } from 'express'
import { ClientsController } from '../controllers/clients.js'

export const clientsRouter = Router()

clientsRouter.get('/', ClientsController.getAll)
