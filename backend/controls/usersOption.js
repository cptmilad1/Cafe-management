const pool = require('../../database/base/pool')
const AppError = require('../utils/appError.js')
const Report = require('../utils/reportSenter.js')
const crudFactory = require('../factory/crudFactory.js')

function getUsers(req,res) {
        const query = crudFactory.get('users')
        return Report(200, "User Data Fetched", query, res)
}

function profile(req,res) {
        const query = crudFactory.getOne(req, 'users')
        const user = query.map((user)=>({
                id : user.id,
                full_name : user.full_name,
                email : user.email,
                role : user.role,
                is_active : user.is_active,
                created_at : user.created_at
        }))
        if(!user) throw new AppError(404, "User not found!")
        return Report(200, "User Details", {user}, res)
}

function editUser(req,res) {
        crudFactory.put(req, 'users')
        return Report(201, "User Updated!", res)
}

function deleteUser(req,res) {
        crudFactory.delete(req, 'users')
        return Report(200, "User Deleted!", res)
}

module.exports = {
    getUsers,
    profile,
    editUser,
    deleteUser
}