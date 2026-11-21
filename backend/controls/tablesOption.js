const Report = require('../utils/reportSenter')
const crudFactory = require('../factory/crudFactory')
const validatorColumns = require('../utils/validBodyColumns')

const validStatuses = ['available', 'occupied', 'reserved', 'inactive']

function validateStatus(status) {
    validatorColumns(status, validStatuses)
}

async function getTables(req, res) {
    const rows = await crudFactory.get('cafe_tables')
    const tables = rows.map((table) => ({
        id: table.id,
        name: table.name,
        capacity: table.capacity,
        status: table.status,
        updated_at: table.updated_at
    }))
    return Report(200, 'Tables info Fetched!', tables, res)
}

async function addTable(req, res) {
    validateStatus(req.body.status)
    const table = await crudFactory.post(req, 'cafe_tables')
    return Report(201, 'Table added!', table, res)
}

async function editTable(req, res) {
    validateStatus(req.body.status)
    const table = await crudFactory.put(req, 'cafe_tables')
    return Report(200, 'Table Updated!', table, res)
}

async function deleteTable(req, res) {
    const table = await crudFactory.delete(req, 'cafe_tables')
    return Report(200, 'Table Deleted!', table, res)
}

async function changeTableStatus(req, res) {
    validateStatus(req.body.status)
    const table = await crudFactory.put(req, 'cafe_tables')
    return Report(200, 'Status changed!', table, res)
}

module.exports = { getTables, editTable, deleteTable, addTable, changeTableStatus }
