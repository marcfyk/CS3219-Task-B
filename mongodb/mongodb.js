import mongodb from 'mongodb'
import { uri, db_name } from '../config/mongodb-config.js'

export const get_db = async () => {
    try {
        const client = new mongodb.MongoClient(uri(db_name), { useNewUrlParser: true, useUnifiedTopology: true })
        const connection = await client.connect()
        return connection.db(db_name)
    } catch (err) {
        return null
    }
}
