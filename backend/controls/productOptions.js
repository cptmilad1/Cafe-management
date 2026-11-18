const pool = require('../../database/base/pool')
const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')

function validator (name, category_id, price, is_available, code){
    if(
            name == null ||
            name == undefined ||
            name == '' && 
            category_id <= 0 ||
            category_id == null ||
            category_id == undefined &&
            price <= 0 ||
            price == null ||
            price == undefined &&
            is_available !== (true || false)
        ) throw new AppError(code, "Please Enter valid parameters for Produt!")
}


function getAllProducts(req,res) {
    const query = crudFactory.get('products')
    return Report(200, "Product Data Fetched", query, res)
}

function getOneProduct(req,res) {
    const query = crudFactory.getOne(req, 'products')
    return Report(200, "Product Fetched!", query, res)
}

function addProduct(req,res) {
    const {category_id, name, price, is_available} = req.body
        validator(name, category_id, price, is_available, 404)
        crudFactory.post(req, 'products')
        return Report(201, "Product added!", res)
}
    
function editProduct(req,res) {
        const {category_id, name, price, is_available} = req.body
        validator(name, category_id, price, is_available, 400)
        crudFactory.put(req, 'products')
        return Report(201, "Product Added", res)
}

function deleteProduct(req,res) {
    crudFactory.delete(req, 'products')
    return Report(200, "Product deleted!", res)
}

module.exports = {getAllProducts, getOneProduct, addProduct, editProduct, deleteProduct}