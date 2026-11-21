const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')

function validator(body, requireAll = false) {
    const { name, category_id, price, is_available } = body

    if (requireAll && (!name || !String(name).trim()))
        throw new AppError(400, 'Please provide a valid product name!')
    if (name !== undefined && (typeof name !== 'string' || !name.trim()))
        throw new AppError(400, 'Please provide a valid product name!')
    if (category_id !== undefined && (!Number.isInteger(Number(category_id)) || Number(category_id) <= 0))
        throw new AppError(400, 'Please provide a valid category id!')
    if (requireAll && (price === undefined || price === null || price === ''))
        throw new AppError(400, 'Please provide a valid price!')
    if (price !== undefined && (!Number.isFinite(Number(price)) || Number(price) < 0))
        throw new AppError(400, 'Please provide a valid price!')
    if (is_available !== undefined && typeof is_available !== 'boolean')
        throw new AppError(400, 'Please provide a valid availability status!')
}

async function getAllProducts(req, res) {
    const products = await crudFactory.get('products')
    return Report(200, 'Product Data Fetched', products, res)
}

async function getOneProduct(req, res) {
    const product = await crudFactory.getOne(req, 'products')
    return Report(200, 'Product Fetched!', product, res)
}

async function addProduct(req, res) {
    validator(req.body, true)
    const product = await crudFactory.post(req, 'products')
    return Report(201, 'Product added!', product, res)
}

async function editProduct(req, res) {
    validator(req.body)
    const product = await crudFactory.put(req, 'products')
    return Report(200, 'Product Updated!', product, res)
}

async function deleteProduct(req, res) {
    const product = await crudFactory.delete(req, 'products')
    return Report(200, 'Product deleted!', product, res)
}

module.exports = { getAllProducts, getOneProduct, addProduct, editProduct, deleteProduct }
