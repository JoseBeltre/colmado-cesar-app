import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.js'
import { PORT } from './config.js'
const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('HOLAAA')
})

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT http://localhost:${PORT}`)
})
