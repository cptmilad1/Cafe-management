const pool = require('../../database/base/pool')
const AppError = require('../utils/appError')

function Validate(value){
    if(value == false || null || undefined || -1){
        throw new AppError(404, "Cannot find Valid Data!")
    }
}

const crudFactory = {
    get : async(tableName)=>{const query = await pool.query(`SELECT * FROM ${tableName}`)
        return query
    },
    getOne : async(req, tableName)=>{
        const {id} = req.params
        Validate(id)
        const query = await pool.query(`SELECT * FROM ${tableName} WHERE id=$1`, [id])
        return query
    },
    post : async(req, tableName)=>{
        const entries = Object.entries(req.body)
        Validate(entries)
        const keys = entries.map(([key])=>key)
        const values = entries.map(([, value])=>value)
        const columns = keys.join(', ')
        const placeHolders = values.map((_,index)=> `$${index+1}`).join(", ")
        const query = `INSERT INTO ${tableName}(${columns}) VALUES (${placeHolders})`
        const result = await pool.query(query, values)
        return result
    },
    put : async(req, tableName)=>{
        const {id} = req.params
        const entries = Object.entries(req.body)
        Validate(entries)
        const keys = entries.map(([key])=>key)
        const values = entries.map(([, value])=>value)
        const updates = keys.map((key, index)=>`${key}=$${index+1}`).join(", ")
        const query = `UPDATE ${tableName} SET ${updates} WHERE id=${id}`
        const result = await pool.query(query, values)
        return result
    },
    delete : async(req, tableName)=>{
        const {id} = req.params
        Validate(id)
        const query = await pool.query(`DELETE FROM ${tableName} WHERE id=$1`, [id])
        return query
    },
    patch : async(req, tableName)=>{
        const {id} = req.params
        const entries = Object.entries(req.body)
        Validate(entries)
        const key = entries.map(([key])=>key)
        const value = entries.map(([value])=>value)
        const query = `UPDATE ${tableName} SET ${key}='${value}' WHERE id=$1`
        const result = await pool.query(query, [id])
        return result
    }
}

module.exports = crudFactory