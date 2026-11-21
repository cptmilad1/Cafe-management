const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')

const orderTypes = ['dine_in', 'takeaway', 'delivery']
const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']
const paymentStatuses = ['unpaid', 'partial', 'paid', 'refunded']

function Validator(body, requireAll = false) {
    const { order_type, status, payment_status } = body

    if (requireAll && !orderTypes.includes(order_type))
        throw new AppError(400, 'Invalid order type!')
    if (order_type !== undefined && !orderTypes.includes(order_type))
        throw new AppError(400, 'Invalid order type!')
    if (status !== undefined && !statuses.includes(status))
        throw new AppError(400, 'Invalid order status!')
    if (payment_status !== undefined && !paymentStatuses.includes(payment_status))
        throw new AppError(400, 'Invalid payment status!')
}

async function getOrders(req, res) {
    const orders = await crudFactory.get('orders')
    return Report(200, 'Data Fetched!', orders, res)
}

async function getOneOrder(req, res) {
    const order = await crudFactory.getOne(req, 'orders')
    return Report(200, 'Data fetched!', order, res)
}

async function addOrder(req, res) {
    Validator(req.body, true)
    const order = await crudFactory.post(req, 'orders')
    return Report(201, 'Order created!', order, res)
}

async function editOrder(req, res) {
    Validator(req.body)
    const order = await crudFactory.put(req, 'orders')
    return Report(200, 'Order Changed!', order, res)
}

async function deleteOrders(req, res) {
    const order = await crudFactory.delete(req, 'orders')
    return Report(200, 'Data Deleted!', order, res)
}

async function patchOrder(req, res) {
    const keys = Object.keys(req.body)
    const allowedItems = ['order_type', 'status', 'payment_status', 'discount', 'notes']
    if (!keys.every((key) => allowedItems.includes(key)))
        throw new AppError(400, 'Invalid data!')
    Validator(req.body)
    const order = await crudFactory.put(req, 'orders')
    return Report(200, 'Order changed!', order, res)
}

module.exports = { getOrders, addOrder, getOneOrder, editOrder, deleteOrders, patchOrder }
