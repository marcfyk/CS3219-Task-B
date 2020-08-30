import express from 'express'
import cors from 'cors'
import mongodb from 'mongodb'
import { uri } from './config/mongodb-config.js'
import { PORT, IP } from './config/config.js'

const run = async () => {
    const app = express()
    app.use(cors())

    app.listen(PORT, IP, () => console.log(`listening on ${IP}:${PORT}`))

    app.use(express.json())

    const connection = await (new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })).connect()

    app.get('/', (req, res) => {
        if (connection) {
            res.status(200).json({
                message: 'API is online :)',
            })
        } else {
            res.status(200).json({
                message: 'API is offline :(',
            })
        }
    })
}

run()
