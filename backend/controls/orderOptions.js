const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')


function Validator(order_type, status, payment_status){
    const validOrderTypes = ['dine_in', 'takeaway', 'delivery']
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']
    const validPaymentStatuses = ['unpaid', 'partial', 'paid', 'refunded']
    if (!validOrderTypes.includes(order_type) || !validStatuses.includes(status) || !validPaymentStatuses.includes(payment_status)) {
        throw new AppError(400, 'Invalid order type or status.')
    }
}


function getOrders(req, res){
    const query = crudFactory.get('orders')
    return Report(200, 'Data Fetched!', query, res)
}

function getOneOrder(req, res){
    const query = crudFactory.getOne(req, 'orders')
    return Report(200, 'Data fetched!', query, res)
}

function editOrder(req, res){
    const {order_type, status, payment_status} = req.body
    Validator(order_type, status, payment_status)
    crudFactory.put(req, 'orders')
    return Report(200, 'Order Changed!', res)
}

function deleteOrders(req, res){
    crudFactory.delete(req, 'orders')
    return Report(200, 'Data Deleted!', res)
}

function patchOrder(req, res){
    const keys = Object.keys(req.body)
    const allowedItems = ["order_type", "status", "payment_status", "discount", "notes"]
    if(!allowedItems.includes(keys))
        throw new AppError(403, 'Invalid data!')
    crudFactory.put(req, 'orders')
    return Report(200, 'Order changed!', res)
}

module.exports = {getOrders, addOrder, getOneOrder, editOrder, deleteOrders, patchOrder}