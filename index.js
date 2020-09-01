import express from 'express'
import cors from 'cors'
import { PORT, IP } from './config/config.js'
import { get_db } from './mongodb/mongodb.js'

import { module_router } from './routes/module.js'

const run = async () => {
    const app = express()
    app.use(cors())

    app.listen(PORT, IP, () => console.log(`listening on ${IP}:${PORT}`))

    app.use(express.json())

    const db = await get_db()
    app.locals.db = db

    app.get('/', (req, res) => {
        if (app.locals.db) {
            res.status(200).json({
                message: 'API is online :)',
            })
        } else {
            res.status(500).json({
                message: 'API is offline :(',
            })
        }
    })

    app.use('/module', module_router)

}

run()
