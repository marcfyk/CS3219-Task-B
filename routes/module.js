import express from 'express'
import { object_contains_other_keys, is_empty_obj, object_contains_keys } from '../util/validation.js'
const router = express.Router()

const MESSAGE_MODULE_DOES_NOT_EXIST = module_code => `module: ${module_code} does not exist`
const MESSAGE_MODULE_ALREADY_EXISTS = module_code => `module: ${module_code} already exists`
const MESSAGE_MODULE_ADDED = module_code => `module: ${module_code} added`
const MESSAGE_MODULE_DELETED = module_code => `module: ${module_code} deleted`
const MESSAGE_MODULE_UPDATED = module_code => `module: ${module_code} updated`
const MESSAGE_REQUIRE_FIELDS = 'requires module_code and module_name'


router.get('/', async (req, res) => {
    const db = req.app.locals.db
    const collection = db.collection('modules')
    const query_keys = ['module_code']
    if (is_empty_obj(req.query)) {
        const documents = await collection.find({}).toArray()
        res.status(200).json({ documents })
    } else if (object_contains_other_keys(req.query, query_keys)) {
        res.sendStatus(400)
    } else {
        const { module_code } = req.query
        let document = await collection.findOne({ module_code })
        if (document === null) {
            res.status(404).json({ message: MESSAGE_MODULE_DOES_NOT_EXIST(module_code) })
        } else {
            res.status(200).json({ document })
        }
    }
})

router.post('/', async (req, res) => {
    const db = req.app.locals.db
    const collection = db.collection('modules')
    const body_keys = ['module_code', 'module_name']
    if (is_empty_obj(req.body) || object_contains_other_keys(req.body, body_keys) || !object_contains_keys(req.body, body_keys)) {
        res.status(400).json({ error: MESSAGE_REQUIRE_FIELDS })
    } else {
        const { module_code, module_name } = req.body
        const document = await collection.findOne({ module_code })
        if (document !== null) {
            res.status(400).json({ message: MESSAGE_MODULE_ALREADY_EXISTS(module_code) })
        } else {
            await collection.insertOne({ module_code, module_name })
            res.status(201).json({message: MESSAGE_MODULE_ADDED(module_code)})
        }
    }
})

router.put('/', async (req, res) => {
    const db = req.app.locals.db
    const collection = db.collection('modules')
    const body_keys = ['module_code', 'module_name']
    if (is_empty_obj(req.body) || object_contains_other_keys(req.body, body_keys) || !object_contains_keys(req.body, body_keys)) {
        res.sendStatus(400)
    } else {
        const { module_code, module_name } = req.body
        const document = await collection.findOne({ module_code })
        if (document === null) {
            res.status(404).json({ message: MESSAGE_MODULE_DOES_NOT_EXIST(module_code) })
        } else {
            await collection.updateOne({ module_code }, { $set: { module_name } })
            res.status(200).json({ message: MESSAGE_MODULE_UPDATED(module_code) })
        }
    }
})

router.delete('/', async (req, res) => {
    const db = req.app.locals.db
    const collection = db.collection('modules')
    const body_keys = ['module_code']
    if (is_empty_obj(req.body) || object_contains_other_keys(req.body, body_keys) || !object_contains_keys(req.body, body_keys)) {
        res.sendStatus(400)
    } else {
        const { module_code } = req.body
        const document = await collection.findOne({ module_code })
        if (document === null) {
            res.status(404).json({ message: MESSAGE_MODULE_DOES_NOT_EXIST(module_code) })
        } else {
            await collection.deleteOne({ module_code })
            res.status(200).json({message: MESSAGE_MODULE_DELETED(module_code)})
        }
    }
})

export { router as module_router };
