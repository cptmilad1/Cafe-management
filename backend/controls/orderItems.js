const pool = require('../../database/base/pool')
const AppError = require('../utils/appError')
const Report = require('../utils/reportSenter')
const crudFactory = require('../factory/crudFactory')
const validatorColumns = require('../utils/validBodyColumns')

async function getAllOrderItems(req,res) {
    const allOrderItems = crudFactory.get('order_items')
    const data = await allOrderItems.map((items)=>({
        id : items.id,
        name : items.product_name,
        qty : items.quantity,
        unitPrice : items.unit_price,
        lineTotal : items.line_total,
        notes : items.notes
    }))
    return Report(200, "Data Fetched!", data, res)
}


async function getOneOrderItems(req,res) {
    const OrderItem = crudFactory.getOne(req, 'order_items')
    const data = await OrderItem.map((items)=>({
        id : items.id,
        name : items.product_name,
        qty : items.quantity,
        unitPrice : items.unit_price,
        lineTotal : items.line_total,
        notes : items.notes
    }))
    return Report(200, 'data fetched!', data, res)
}


async function addOrderItems(req,res) {
    const {product_name, quantity, unit_price, line_total, notes, table_id, tax, discount} = req.body
    const customer_id = await pool.query(`INSERT INTO customer RETURNNING *`)
    const productId = (await crudFactory.getOneByName(product_name, 'products')).rows[0].map((product)=>product.id)
    const query = await pool.query(`INSERT INTO order_items 
        (customer_id, product_id, product_name, quantity, unit_price, line_total, notes)
        VALUES('$1', '$2', '$3', '$4', '$5', '$6', '$7') RETURNNING id;
        `, [customer_id, productId, product_name, quantity, unit_price, line_total, notes])
    const subtotal = pool.query(`SELECT COALESCE(SUM(quantity * unit_price), 0) AS subtotal FROM order_items WHERE customer_id=$1`, [customer_id])
    const order = await pool.query(`INSERT INTO orders (order_items_id, table_id, subtotal, tax, discount)
        VALUES ('$8', '$9', '$10', '$11') RETURNNING id`, [query.id , table_id, subtotal, tax, discount])
    if(query.rowCount == 0) throw new AppError(404, "Cannot save order now!")
    return Report(200, "An Order item Saved!", res)
}

async function editOrderItems(req,res) {
    const {order_name, product_name, quantity, unit_price, line_total, notes} = req.body
    const orderId = (await crudFactory.getOneByName(order_name, 'orders')).rows[0].map((order)=>order.id)
    const productId = (await crudFactory.getOneByName(product_name, 'products')).rows[0].map((product)=>product.id)
    const query = await pool.query(`UPDATE order_items SET
        order_id=$1, product_id=$2, product_name=$3, quantity=$4, unit_price=$5, line_total=$6, notes=$7
        `, [orderId, productId, product_name, quantity, unit_price, line_total, notes])
    if(query.rowCount == 0) throw new AppError(404, "Cannot Edit item!")
    return Report(200, "An Order item Edited!", res)
}

function deleteOrderItems(req, res){
    crudFactory.delete(req, 'order_items')
    return Report(201, "Deleted Successfully!")
}

function patchOrderItems(req, res){
    const validArgs = ['product_name', 'quantity', 'unit_price', 'notes']
    validatorColumns(JSON.stringify(req.body), validArgs)
    crudFactory.put(req, 'order_items')
    return Report(200, "Changes Applied!", res)
}

module.exports = {
    getAllOrderItems,
    getOneOrderItems,
    addOrderItems,
    deleteOrderItems,
    editOrderItems,
    patchOrderItems
}