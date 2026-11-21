const Report = require('../utils/reportSenter')
const crudFactory = require('../factory/crudFactory')

async function getPayment(req, res) {
    const payments = await crudFactory.get('payments')
    return Report(200, 'Data Fetched!', payments, res)
}

async function getOnePayment(req, res) {
    const payment = await crudFactory.getOne(req, 'payments')
    return Report(200, 'data fetched!', payment, res)
}

async function addPayment(req, res) {
    const payment = await crudFactory.post(req, 'payments')
    return Report(201, 'Payment Added!', payment, res)
}

async function editPayment(req, res) {
    const payment = await crudFactory.put(req, 'payments')
    return Report(200, 'payment edited!', payment, res)
}

async function deletePayment(req, res) {
    const payment = await crudFactory.delete(req, 'payments')
    return Report(200, 'Payment deleted!', payment, res)
}

module.exports = { getPayment, getOnePayment, addPayment, editPayment, deletePayment }
