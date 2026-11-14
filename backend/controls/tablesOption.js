const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')
const validatorColumns = require('../utils/validBodyColumns')

function getTables(req,res) {
        const query = crudFactory.get('cafe_tables')
        const tables = query.rows.map((tables)=> ({
                id : tables.id,
                name : tables.name,
                capacity : tables.capacity,
                status : tables.status,
                updated_at : tables.updated_at
        }))
        if(query.rowCount == 0) throw new AppError(404, "Can not sent tables details now!")
        return Report(200, "Tables info Fetched!", {tables}, res)
}

function addTable(req,res) {
        const {status} = req.body
        validatorColumns(status, ['available', 'occupied', 'reserved', 'inactive'])
        const query = crudFactory.post(req, 'cafe_tables')
        if(query.rowCount == 0) throw new AppError(404, "Cannot add table now")
        return Report(201, "Table added!", res)
}

async function editTable(req,res) {
        const {status} = req.body
        validatorColumns(status, ['available', 'occupied', 'reserved', 'inactive'])
        const query = crudFactory.put(req, 'cafe_tables')
        if(query.rowCount == 0) throw new AppError(404, "Cannot edit table now")
        return Report(201, "Table Updated!", res)
}

async function deleteTable(req,res) {
        const query = crudFactory.delete(req, 'cafe_tables')
        if(query.rowCount == 0) throw new AppError(404, "Table not found or cannot Deleted!")
                return Report(200, "Table Deleted!", res)
}
async function changeTableStatus(req,res) {
        const {status} = req.body
        validatorColumns(status, ['available', 'occupied', 'reserved', 'inactive'])
        const query = crudFactory.patch(req, 'cafe_tables')
        if(query.rowCount == 0) throw new AppError(404, 'Cannot change status!')
        return Report(200, "Status changed!", res)
}

module.exports = {
    getTables,
    editTable,
    deleteTable,
    addTable,
    changeTableStatus
}