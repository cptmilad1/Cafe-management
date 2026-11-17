const pool = require('../../database/base/pool')
const AppError = require('../utils/appError')
const Report = require('../utils/reportSenter')
const crudFactory = require('../factory/crudFactory')


function getAllCategories(req,res) {
    const query = crudFactory.get('categories')
    return Report(200, "data fetched", query, res)
}

function categotyFilter(req,res) {
    const {filterName} = req.body
    const query = crudFactory.getOneByName(filterName, 'categories')
    return Report(200, "data fetched", query, res)
}

async function addCategory(req,res) {
    const {is_active} = req.body
    const validActive = [true, false]
    if(!is_active.includes(validActive)) throw new AppError(404, "Category Activition Status parameters is not valid!")
    const query = crudFactory.post(req, 'categories')
    return Report(201, 'Category created!', res)
}

async function editCategory(req,res) {
    const {is_active} = req.body
    const validActive = [true, false]
    if(!is_active.includes(validActive)) throw new AppError(404, "Category Activition Status not valid!")
    crudFactory.put(req, 'categories')
    return Report(201, 'Category Updated!', res)
}

async function deleteCtegory(req,res) {
    crudFactory.delete(req, 'categories')
    return Report(200, "Category successfully Deleted!", res)
}

module.exports = {
    getAllCategories,
    categotyFilter,
    editCategory,
    deleteCtegory,
    addCategory
}