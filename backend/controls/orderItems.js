const pool = require('../../database/base/pool')
const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')
const validatorColumns = require('../utils/validBodyColumns')

function toItem(item) {
    return {
        id: item.id,
        name: item.product_name,
        qty: item.quantity,
        unitPrice: item.unit_price,
        lineTotal: item.line_total,
        notes: item.notes
    }
}

async function getAllOrderItems(req, res) {
    const items = await crudFactory.get('order_items')
    return Report(200, 'Data Fetched!', items.map(toItem), res)
}

async function getOneOrderItems(req, res) {
    const item = await crudFactory.getOne(req, 'order_items')
    return Report(200, 'data fetched!', toItem(item), res)
}

async function addOrderItems(req, res) {
    const { product_name, quantity, unit_price, notes, table_id, tax = 0, discount = 0 } = req.body
    const order_type = req.body.order_type || 'dine_in'

    if (!product_name || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0 ||
        !Number.isFinite(Number(unit_price)) || Number(unit_price) < 0)
        throw new AppError(400, 'Please provide a valid product, quantity and unit price!')

    const product = await crudFactory.getOneByName(product_name, 'products')
    const subtotal = Number(quantity) * Number(unit_price)
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        const customer = await client.query('INSERT INTO customer DEFAULT VALUES RETURNING id')
        const order = await client.query(
            `INSERT INTO orders (order_type, table_id, created_by, subtotal, tax, discount)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [order_type, table_id || null, req.user.id, subtotal, tax, discount]
        )
        const item = await client.query(
            `INSERT INTO order_items (customer_id, order_id, product_id, product_name, quantity, unit_price, notes)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [customer.rows[0].id, order.rows[0].id, product.id, product_name, quantity, unit_price, notes || null]
        )
        await client.query('UPDATE orders SET order_items_id=$1 WHERE id=$2', [item.rows[0].id, order.rows[0].id])
        await client.query('COMMIT')
        return Report(201, 'An Order item Saved!', { order: order.rows[0], item: item.rows[0] }, res)
    } catch (err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

async function editOrderItems(req, res) {
    const item = await crudFactory.put(req, 'order_items')
    return Report(200, 'An Order item Edited!', toItem(item), res)
}

async function deleteOrderItems(req, res) {
    const item = await crudFactory.delete(req, 'order_items')
    return Report(200, 'Deleted Successfully!', toItem(item), res)
}

async function patchOrderItems(req, res) {
    const validArgs = ['product_name', 'quantity', 'unit_price', 'notes', 'order_id', 'product_id']
    validatorColumns(Object.keys(req.body), validArgs)
    const item = await crudFactory.put(req, 'order_items')
    return Report(200, 'Changes Applied!', toItem(item), res)
}

module.exports = {
    getAllOrderItems,
    getOneOrderItems,
    addOrderItems,
    deleteOrderItems,
    editOrderItems,
    patchOrderItems
}
