const Report = require('../utils/reportSenter')
const AppError = require('../utils/appError')
const crudFactory = require('../factory/crudFactory')

function validateActive(is_active) {
    if (is_active !== undefined && typeof is_active !== 'boolean')
        throw new AppError(400, 'Category activation status is not valid!')
}

async function getAllCategories(req, res) {
    const categories = await crudFactory.get('categories')
    return Report(200, 'Data fetched', categories, res)
}

async function categotyFilter(req, res) {
    const name = req.body.filterName || req.query.filterName
    const category = name
        ? await crudFactory.getOneByName(name, 'categories')
        : await crudFactory.getOneById(req.params.id, 'categories')
    return Report(200, 'Data fetched', category, res)
}

async function addCategory(req, res) {
    validateActive(req.body.is_active)
    const category = await crudFactory.post(req, 'categories')
    return Report(201, 'Category created!', category, res)
}

async function editCategory(req, res) {
    validateActive(req.body.is_active)
    const category = await crudFactory.put(req, 'categories')
    return Report(200, 'Category Updated!', category, res)
}

async function deleteCtegory(req, res) {
    const category = await crudFactory.delete(req, 'categories')
    return Report(200, 'Category successfully Deleted!', category, res)
}

module.exports = { getAllCategories, categotyFilter, editCategory, deleteCtegory, addCategory }
