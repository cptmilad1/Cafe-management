const pool = require('../../database/base/pool')
const AppError = require('../utils/appError')
const Report = require('../utils/reportSenter')

async function addOrderItems(req,res) {
    const {order_id, product_id, product_name, quantity, unit_price, line_total, notes} = req.body
    const query = await pool.query(`INSERT INTO order_items 
        (order_id, product_id, product_name, quantity, unit_price, line_total, notes)
        VALUES('$1', '$2', '$3', '$4', '$5', '$6', '$7')
        `, [order_id, product_id, product_name, quantity, unit_price, line_total, notes])
    if(query.rowCount == 0) throw new AppError(404, "Cannot save order now!")
    return Report(200, "Order saved!", res)
}

async function editOrderItems(req,res) {
    const {order_id, product_id, product_name, quantity, unit_price, notes} = req.body
    const query = await pool.query(`INSERT INTO order_items 
        (order_id, product_id, product_name, quantity, unit_price, line_total, notes)
        VALUES('$1', '$2', '$3', '$4', '$5', '$6', '$7')
        `, [order_id, product_id, product_name, quantity, unit_price, line_total, notes])
    if(query.rowCount == 0) throw new AppError(404, "Cannot save order now!")
    return Report(200, "Order saved!", res)
}