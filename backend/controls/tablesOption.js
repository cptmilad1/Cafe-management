const pool = require('../../database/base')
const Report = require('../utils/reportSenter')

async function getTables(req,res,next) {
    try{
        const query = await pool.query(`SELECT * FROM cafe_tables RETURNING id, name, capacity, status, updated_at`)
        if(query.rowCount == 0) return Report(404, "Can not sent tables details now!", res)
        return Report(200, "Tables info Fetched!", query.rows, res)
    }catch(err){
        next(err)
    }
}

async function addTable(req,res,next) {
    try{
        const {name, capacity, status} = req.body
        const allowedStatus = ['available', 'occupied', 'reserved', 'inactive']
        if(!status.includes(allowedStatus)) return Report(403, "Status not valid!", res)
        const query = await pool.query(`INSERT INTO cafe_tables (name, capacity, status) VALUES('$1', '$2', '$3')`, [name, capacity, status])
        if(query.rowCount == 0) return Report(404, "Cannot add table now", res)
        return Report(201, "Table added!", res)
}catch(err){
    next(err)
}
}

async function editTable(req,res,next) {
    try{
        const {name, capacity, status} = req.body
        const {id} = req.params
        const allowedStatus = ['available', 'occupied', 'reserved', 'inactive']
        if(!status.includes(allowedStatus)) return Report(403, "Status not valid!", res)
        const query = await pool.query(`UPDATE cafe_tables SET name=$1, capacity=$2, status=$3 WHERE id=$4`, [name, capacity, status, id])
        if(query.rowCount == 0) return Report(404, "Cannot edit table now", res)
        return Report(201, "Table Updated!", res)
    }catch(err){
        next(err)
    }
}

async function deleteTable(req,res,next) {
    try{
        const {id} = req.params
        const query = pool.query(`DELETE FROM cafe_tables WHERE id=$1`, [id])
        if(query.rowCount == 0) return Report(404, "Table not found or cannot Deleted!", res)
        return Report(200, "Table Deleted!", res)
    }catch(err){
        next(err)
    }
}
async function changeTableStatus(req,res,next) {
    try{
        const {status} = req.body
        const {id} = req.params
        const allowedStatus = ['available', 'occupied', 'reserved', 'inactive']
        if(!status.includes(allowedStatus)) return Report(403, "Status not valid!", res)
        const query = await pool.query(`UPDATE cafe_tables SET status=$1 WHERE id=$2`, [status, id])
        if(query.rowCount == 0)return Report(404, 'Cannot change status!', res)
        return Report(200, "Status changed!", res)
    }catch(err){
        next(err)
    }
}

module.exports = {
    getTables,
    editTable,
    deleteTable,
    addTable,
    changeTableStatus
}