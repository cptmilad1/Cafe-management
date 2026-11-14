const pool = require('../../database/base/pool')
const AppError = require('../utils/appError')
const Report = require('../utils/reportSenter')


async function getAllCategories(req,res) {
    const query = await pool.query(`SELECT * FROM categories`)
    return Report(200, "data fetched", query.rows, res)
}

async function categotyFilter(req,res) {
    const {filterName} = req.body
    const query = await pool.query(`SELECT * FROM categories WHERE name=$1`, [filterName])
    return Report(200, "data fetched", query.rows, res)
}

async function addCategory(req,res) {
    const {name, description, is_active} = req.body
    const validActive = [true, false]
    if(!is_active.includes(validActive)) throw new AppError(404, "Category Activition Status not valid!")
    const query = await pool.query(`INSERT INTO categories (name, description, is_active) VALUES('$1', '$2', '$3')`, [name, description, is_active])
    if(query.rowCount == 0) throw new AppError(404, 'Action feild to add Category!')
    return Report(201, 'Category created!', res)
}

async function editCategory(req,res) {
    const {id} = req.params
    const {name, description, is_active} = req.body
    const validActive = [true, false]
    if(!is_active.includes(validActive)) throw new AppError(404, "Category Activition Status not valid!")
    const query = await pool.query(`UPDATE categories SET name=$1, description=$2, is_active=$3 WHERE id=$4`, [name, description, is_active, id])
    if(query.rowCount == 0) throw new AppError(404, 'Cannot Edit category now!')
    return Report(201, 'Category Updated!', res)
}

async function deleteCtegory(req,res) {
    const {id} = req.params
    const query = await pool.query(`DELETE FROM categories WHERE id=$1`, [id])
    if(query.rowCount == 0) throw new AppError(404, "Cannot delete category!")
    return Report(200, "Category successfully Deleted!", res)
}

module.exports = {
    getAllCategories,
    categotyFilter,
    editCategory,
    deleteCtegory,
    addCategory
}