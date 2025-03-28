import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.patch('/activate', AuthController.activate)
authRouter.delete('/deny', AuthController.deny)
