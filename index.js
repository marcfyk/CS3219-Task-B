import express from 'express'
import cors from 'cors'

import { PORT, IP } from './config/config.js'

const app = express()
app.use(cors())

app.listen(PORT, IP, () => console.log(`listening on ${IP}:${PORT}`))

app.use(express.json())

