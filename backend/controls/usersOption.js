const pool = require('../../database/base/pool')
const AppError = require('../utils/appError.js')
const Report = require('../utils/reportSenter.js')
const crudFactory = require('../factory/crudFactory.js')

function getUsers(req,res) {
        const query = crudFactory.get('users')
        const users = query.rows
        if(!users) throw new AppError(404, "Any user not found!")
        return Report(200, "User Data Fetched", query.rows, res)
}

function profile(req,res) {
        const query = crudFactory.getOne(req, 'users')
        const user = query.rows[0].map((user)=>({
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
        const query = crudFactory.patch(req, 'users')
        if(query.rowCount == 0) throw new AppError(402, "Cannot Update user!")
        return Report(201, "User Updated!", res)
}

function deleteUser(req,res) {
        const query = crudFactory.delete(req, 'users')
        if(query.rowCount == 0) throw new AppError(403, 'Cannot Delete user now!')
        return Report(200, "User Deleted!", res)
}

module.exports = {
    getUsers,
    profile,
    editUser,
    deleteUser
}