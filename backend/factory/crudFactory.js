const pool = require('../../database/base/pool')

const crudFactory = {
    get : async(tableName)=>{const query = await pool.query(`SELECT * FROM ${tableName} RETURNING *`)
        return query
    },
    getOne : async(req, tableName)=>{
        const {id} = req.params
        const query = await pool.query(`SELECT * FROM ${tableName} WHERE id=$1`, [id])
        return query
    },
    post : async(req, tableName)=>{
        const entires = Object.entries(req.body)
        const keys = entires.map(([key])=>key)
        const values = entires.map(([, value])=>value)
        const columns = keys.join(', ')
        const placeHolders = values.map((_,index)=> `$${index+1}`).join(", ")
        const query = `INSERT INTO ${tableName}(${columns}) VALUES (${placeHolders})`
        const result = await pool.query(query, values)
        return result
    },
    put : async(req, tableName)=>{
        const {id} = req.params
        const entires = Object.entries(req.body)
        const keys = entires.map(([key])=>key)
        const values = entires.map(([, value])=>value)
        const updates = keys.map((key, index)=>`${key}=$${index+1}`).join(", ")
        const query = `UPDATE ${tableName} SET ${updates} WHERE id=${id}`
        const result = await pool.query(query, values)
        return result
    },
    delete : async(req, tableName)=>{
        const {id} = req.params
        const query = await pool.query(`DELETE FROM ${tableName} WHERE id=$1`, [id])
        return query
    },
    patcth : async(req, tableName)=>{
        const {id} = req.params
        const entires = Object.entires(req.body)
        const key = entires.map(([key])=>key)
        const value = entires.map(([value])=>value)
        const query = `UPDATE ${tableName} SET ${key}='${value}' WHERE id=$1`
        const result = await pool.query(query, [id])
        return result
    }
}

module.exports = crudFactory