const pool = require('../utils/pool')
const AppError = require('../utils/appError')

const tableColumns = {
    users: ['full_name', 'email', 'password_hash', 'is_active'],
    categories: ['name', 'description', 'is_active'],
    products: ['category_id', 'name', 'description', 'sku', 'price', 'is_available'],
    cafe_tables: ['name', 'capacity', 'status'],
    orders: ['order_type', 'status', 'payment_status', 'table_id', 'created_by', 'subtotal', 'tax', 'discount', 'notes'],
    order_items: ['customer_id', 'order_id', 'product_id', 'product_name', 'quantity', 'unit_price', 'notes'],
    payments: ['order_id', 'amount', 'method', 'status', 'reference', 'received_by', 'paid_at']
}

function validateTableName(tableName) {
    if (!Object.hasOwn(tableColumns, tableName))
        throw new AppError(400, 'Invalid table name!')
}

function validateId(id) {
    if (!/^[1-9]\d*$/.test(String(id)))
        throw new AppError(400, 'Please provide a valid id!')
    return String(id)
}

function getEntries(body, tableName) {
    if (body === null || typeof body !== 'object' || Array.isArray(body))
        throw new AppError(400, 'Please provide valid data!')

    const entries = Object.entries(body)
    if (entries.length === 0)
        throw new AppError(400, 'Please provide valid data!')

    for (const [key] of entries) {
        if (!tableColumns[tableName].includes(key))
            throw new AppError(400, `Invalid column name: ${key}`)
    }
    return entries
}

function ensureFound(result) {
    if (!result || result.rowCount === 0)
        throw new AppError(404, 'Record not found!')
    return result
}

const crudFactory = {
    get: async (tableName) => {
        validateTableName(tableName)
        const result = await pool.query(`SELECT * FROM ${tableName}`)
        return result.rows
    },
    getOne: async (req, tableName) => {
        validateTableName(tableName)
        return crudFactory.getOneById(req.params.id, tableName)
    },
    getOneById: async (id, tableName) => {
        validateTableName(tableName)
        const validId = validateId(id)
        const result = ensureFound(await pool.query(`SELECT * FROM ${tableName} WHERE id=$1`, [validId]))
        return result.rows[0]
    },
    getOneByName: async (name, tableName) => {
        validateTableName(tableName)
        if (typeof name !== 'string' || name.trim() === '')
            throw new AppError(400, 'Please provide a valid name!')
        const result = ensureFound(await pool.query(`SELECT * FROM ${tableName} WHERE name=$1`, [name]))
        return result.rows[0]
    },
    post: async (req, tableName) => {
        validateTableName(tableName)
        const entries = getEntries(req.body, tableName)
        const columns = entries.map(([key]) => key)
        const values = entries.map(([, value]) => value)
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ')
        const result = ensureFound(await pool.query(
            `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
            values
        ))
        return result.rows[0]
    },
    put: async (req, tableName) => {
        validateTableName(tableName)
        const id = validateId(req.params.id)
        const entries = getEntries(req.body, tableName)
        const values = entries.map(([, value]) => value)
        const updates = entries.map(([key], index) => `${key}=$${index + 1}`).join(', ')
        values.push(id)
        const result = ensureFound(await pool.query(
            `UPDATE ${tableName} SET ${updates} WHERE id=$${values.length} RETURNING *`,
            values
        ))
        return result.rows[0]
    },
    delete: async (req, tableName) => {
        validateTableName(tableName)
        const id = validateId(req.params.id)
        const result = ensureFound(await pool.query(
            `DELETE FROM ${tableName} WHERE id=$1 RETURNING *`,
            [id]
        ))
        return result.rows[0]
    }
}

module.exports = crudFactory
