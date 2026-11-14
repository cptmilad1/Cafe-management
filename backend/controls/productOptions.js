const pool = require('../../database/base/pool')
const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')

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


async function getProducts(req,res) {
    const query = await pool.query(`SELECT * FROM products`)
    if(query.rowCount == 0) throw new AppError(404, "No product found or Recieve Data feild!")
    return Report(200, "Product Data Fetched", query.rows, res)
}

async function getOneProduct(req,res) {
    const {id} = req.params
    const query = await pool.query(`SELECT * FROM products WHERE id=$1`, [id])
    return Report(200, "Product Fetched!", query.rows[0], res)
}

async function addProduct(req,res) {
    const {category_id, name, description, sku, price, is_available} = req.body
        validator(name, category_id, price, is_available, 404)
        const query = await pool.query(`INSERT INTO products (category_id, name, description, sku, price, is_availible) 
            VALUES('$1', '$2', '$3', '$4', '$5', '$6')`, [category_id, name, description, sku, price, is_available])
        if(query.rowCount == 0) throw new AppError(400, 'Cannot add product now!')
        return Report(201, "Product added!", res)
}
    
async function editProduct(req,res) {
        const {category_id, name, description, sku, price, is_available} = req.body
        validator(name, category_id, price, is_available, 400)
        const query = await pool.query(`UPDATE products SET category_id=$1, name=$2, dscriptoin=$3, sku=$4, price=$5, is_available=$6`, [category_id, name, description, sku, price, is_available])
        if(query.rowCount == 0) throw new AppError(400, "Cannot edit product now!")
        return Report(201, "Product Added", res)
}

async function deleteProduct(req,res) {
    const {id} = req.params
    await pool.query(`DELETE FROM products WHERE id=$1`, [id])
    return Report(200, "Product deleted!", res)
}

module.exports = {getProducts, getOneProduct, addProduct, editProduct, deleteProduct}