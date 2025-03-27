import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { PORT } from './config.js'
const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HOLAAA')
})

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT http://localhost:${PORT}`)
})
