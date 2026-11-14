const pool = require('../../database/base/pool')
const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')


async function addOrder(req,res) {
    const {
        order_type = 'dine_in',
        status = 'pending',
        payment_status = 'unpaid',
        table_id = null,
        created_by = null,
        products,
        tax = 0,
        discount = 0,
        notes = null,
    } = req.body
    const validOrderTypes = ['dine_in', 'takeaway', 'delivery']
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']
    const validPaymentStatuses = ['unpaid', 'partial', 'paid', 'refunded']

    if (!validOrderTypes.includes(order_type) || !validStatuses.includes(status) || !validPaymentStatuses.includes(payment_status)) {
        throw new AppError(400, 'Invalid order type or status.')
    }
    const 
}

module.exports = {addOrder}