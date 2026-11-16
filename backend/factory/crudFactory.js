const pool = require('../../database/base/pool')
const AppError = require('../utils/appError')

const allowedTables = new Set([
    'users',
    'categories',
    'products',
    'cafe_tables',
    'orders',
    'order_items',
    'payments'
])

async function dataInject(params){
    if(params.rowCount == 0)
        throw new AppError(501, 'Server Can not handle')
}

function validateTableName(tableName) {
    if(!allowedTables.has(tableName))
        throw new AppError(400, 'Invalid table name!')
}

function validateId(id) {
    if(typeof id !== 'string' || !/^[1-9]\d*$/.test(id))
        throw new AppError(400, 'Please provide a valid id!')
}

function getEntries(body) {
    if(body === null || typeof body !== 'object' || Array.isArray(body))
        throw new AppError(400, 'Please provide valid data!')

    const entries = Object.entries(body)
    if(entries.length === 0)
        throw new AppError(400, 'Please provide valid data!')

    for(const [key] of entries) {
        if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key))
            throw new AppError(400, 'Invalid column name!')
    }

    return entries
}

const crudFactory = {
    get : async(tableName)=>{
        validateTableName(tableName)
        const query = await pool.query(`SELECT * FROM ${tableName}`)
        dataInject(query)
        return query.rows
    },
    getOne : async(req, tableName)=>{
        validateTableName(tableName)
        const {id} = req.params
        validateId(id)
        const query = await pool.query(`SELECT * FROM ${tableName} WHERE id=$1`, [id])
        dataInject(query)
        return query.rows[0]
    },
    getOneById : async(id, tableName)=>{
        validateTableName(tableName)
        validateId(id)
        const query = await pool.query(`SELECT * FROM ${tableName} WHERE id=$1`, [id])
        dataInject(query)
        return query.rows[0]
    },
    getOneByName : async(name, tableName)=>{
        validateTableName(tableName)
        const query = await pool.query(`SELECT * FROM ${tableName} WHERE name=$1`, [name])
        dataInject(query)
        return query.rows[0]
    },
    post : async(req, tableName)=>{
        validateTableName(tableName)
        const entries = getEntries(req.body)
        const keys = entries.map(([key])=>key)
        const values = entries.map(([, value])=>value)
        const columns = keys.join(', ')
        const placeHolders = values.map((_,index)=> `$${index+1}`).join(", ")
        const query = `INSERT INTO ${tableName}(${columns}) VALUES (${placeHolders})`
        const result = await pool.query(query, values)
        dataInject(result)
        return result
    },
    put : async(req, tableName)=>{
        validateTableName(tableName)
        const {id} = req.params
        validateId(id)
        const entries = getEntries(req.body)
        const keys = entries.map(([key])=>key)
        const values = entries.map(([, value])=>value)
        values.push(id)
        const updates = keys.map((key, index)=>`${key}=$${index+1}`).join(", ")
        const query = `UPDATE ${tableName} SET ${updates} WHERE id=$${values.length}`
        const result = await pool.query(query, values)
        dataInject(result)
        return result
    },
    delete : async(req, tableName)=>{
        validateTableName(tableName)
        const {id} = req.params
        validateId(id)
        const query = await pool.query(`DELETE FROM ${tableName} WHERE id=$1`, [id])
        dataInject(query)
        return query
    },
    patch : async(req, tableName)=>{
        validateTableName(tableName)
        const {id} = req.params
        validateId(id)
        const entries = getEntries(req.body)
        const keys = entries.map(([key])=>key)
        const values = entries.map(([, value])=>value)
        values.push(id)
        const updates = keys.map((key, index)=>`${key}=$${index+1}`).join(", ")
        const query = `UPDATE ${tableName} SET ${updates} WHERE id=$${values.length}`
        const result = await pool.query(query, values)
        dataInject(result)
        return result
    }
}

module.exports = crudFactory