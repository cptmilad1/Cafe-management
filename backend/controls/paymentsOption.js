const pool = require('../../database/base/pool')
const Report = require('../utils/reportSenter')
const crudFactory = require('../factory/crudFactory')

function getPayment(req, res){
    const peyments = crudFactory.get('payments')
    return Report(200, "Data Fetched!", {peyments}, res)
}

function getOnePayment(req, res){
    crudFactory.getOne(req, 'payments')
    return Report(200, 'data fetched!', res)
}

function addPayment(req, res){
    crudFactory.post(req, 'payments')
    return Report(201, "Payment Added!", res)
}

function editPayment(req, res){
    crudFactory.put(req, 'payments')
    return Report(200, "payment edited!", res)
}

function deletePayment(req, res){
    crudFactory.delete(req, 'payments')
    return Report(200, "Payment deleted!", res)
}

module.exports = {getPayment, getOnePayment, addPayment, editPayment, deletePayment}